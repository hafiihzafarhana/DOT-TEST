import { UserAgentDto } from "@/dtos/userAgent.dto";
import UserSession from "@/models/userSession.model";
import { RegisterUserDto, LoginUserDto } from "@dtos/auth.dto";
import { TokenPayload } from "@interfaces/token.interface";
import { UserInterface } from "@interfaces/user.interface";

// all about response
import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "@/utils/apiResponse.util";
import { ApiResponseInterface } from "@interfaces/apiResponse.interface";
import { Response } from "express";

// utils and helper
import { isEmpty } from "@/utils/isEmpty.util";
import { USER_ID } from "@/utils/constant.util";
import PasswordHasher from "@/utils/passwordHasher.util";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@/utils/jwt.util";
import { userAgentParser } from "@helpers/userAgent.parser";
import { ErrorInterface } from "@/interfaces/error.interface";
import {
  HttpException,
  HttpExceptionBadRequest,
  HttpExceptionForbidden,
  HttpExceptionNotFound,
} from "@/exceptions/HttpException";
import UserRepository from "@/repositories/user.repository";
import UserRoleRepository from "@/repositories/userRole.repository";
import UserSessionRepository from "@/repositories/userSession.repository";

class AuthService {
  public userRepository = new UserRepository();
  public userRoleRepository = new UserRoleRepository();
  public userSessionRepository = new UserSessionRepository();

  public register = async (userData: RegisterUserDto): Promise<ApiResponseInterface> => {
    // check data from request
    if (isEmpty(userData)) throw new HttpExceptionBadRequest("Empty data. Please fill the form");

    // is email already registerd
    const findUserWithEmail: UserInterface | null =
      await this.userRepository.findUserByEmailAndDeletedNull(userData);

    if (findUserWithEmail) throw new HttpExceptionForbidden("Email already registered");

    // is username already registered
    const findUserWithUsername: UserInterface | null =
      await this.userRepository.findUserByUsernameAndDeletedNull(userData);

    if (findUserWithUsername) throw new HttpExceptionForbidden("Username already registered");

    // hashing pw
    const hashed = await PasswordHasher.hashPassword(userData.password);

    const userPayload = {
      email: userData.email.toLocaleLowerCase(),
      name: userData.name,
      password: hashed,
      user_name: userData.username,
    };

    // create user to db
    const newUser = await this.userRepository.createUser(userPayload);
    const userRolePayload = {
      user_id: newUser.id,
      role_id: USER_ID,
    };

    // asign user and role to db
    await this.userRoleRepository.createUserRole(userRolePayload);

    return apiResponse(status.CREATED, "SUCCESS", "Success created a new account");
  };

  public login = async (
    userData: LoginUserDto,
    userAgent: UserAgentDto,
    res: Response,
  ): Promise<unknown> => {
    // check data from requiest
    if (isEmpty(userData)) throw new HttpExceptionBadRequest("Empty data. Please fill the form");

    // is email have registerd
    const findUser = await this.userRepository.findUserByEmail(userData);

    if (!findUser) throw new HttpExceptionForbidden("Invalid email and password combination");

    if (findUser.password === null)
      throw new HttpExceptionForbidden("This email hasn't set password. Please login by google.");

    // password check from db and request '
    const isPasswordValid = await PasswordHasher.comparePassword(
      userData.password,
      findUser.password,
    );
    if (!isPasswordValid)
      throw new HttpExceptionForbidden("Invalid email and password combination");

    // parsing user agent
    const parsedUserAgent: string = userAgentParser(userAgent);

    // cek user agent, jika sama dengan db maka akan memberikan refresh dan akses token yg ada di db
    const findSession = await this.userSessionRepository.findSessionByUserIdStatusUserAgent(
      findUser.id,
      parsedUserAgent,
    );

    // Jika session ditemukan dan role masih sama
    if (findSession) {
      await findSession.update({ status: "EXPIRED" });
    }

    const sessionPayload = {
      user_id: findUser.id,
      status: "ACTIVE",
      user_agent: parsedUserAgent,
      access_token: "Empty",
      refresh_token: "Empty",
    };

    const newSession = await this.userSessionRepository.createUserSession(sessionPayload);

    const payloadToken: TokenPayload = {
      user_id: findUser.id,
      role_id: findUser.user_role.role_id,
      session_id: newSession.id,
    };

    // generate token
    const refreshToken: string = generateRefreshToken(payloadToken);
    const accessToken: string = generateAccessToken(payloadToken);

    newSession.access_token = accessToken;
    newSession.refresh_token = refreshToken;

    // save refresh token to db
    await newSession.save();
    // save token to cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    const token = {
      refresh_token: refreshToken,
      access_token: accessToken,
    };

    return token;
  };

  public tokenRefresh = async (
    access_token: string,
  ): Promise<{ access_token: string; refresh_token: string } | undefined> => {
    if (isEmpty(access_token))
      throw new HttpException(status.UNAUTHORIZED, "UNAUTHORIZED", "Refresh token doesn't exist");

    // is access token found
    const isAccessTokenFound = await this.userSessionRepository.findAccessToken(access_token);

    if (!isAccessTokenFound)
      throw new HttpExceptionForbidden("Invalid or Expired Refresh Token. Please login again");

    // is there refresh token and still active
    const isRefreshTokenFound = await this.userSessionRepository.findRefreshToken(
      isAccessTokenFound.refresh_token,
    );

    if (!isRefreshTokenFound)
      throw new HttpExceptionForbidden("Invalid or Expired Refresh Token. Please login again");

    try {
      // verify refresh token (expired and secret key)
      const verifiedToken: TokenPayload | null = verifyRefreshToken(
        isRefreshTokenFound.refresh_token,
      );
      if (!verifiedToken) {
        // update status menjadi expired
        await UserSession.update(
          { status: "EXPIRED" },
          { where: { refresh_token: isRefreshTokenFound.refresh_token } },
        );
        throw new HttpExceptionForbidden("Expired Refresh token. Please login again");
      }

      const findUser = await this.userRepository.findUserById(verifiedToken.user_id);
      if (!findUser) throw new HttpExceptionNotFound("User Not Found");

      const payloadToken = {
        user_id: verifiedToken.user_id,
        role_id: findUser.user_role.role_id,
        session_id: verifiedToken.session_id,
      };
      // create new access token
      const newAccessToken = generateAccessToken(payloadToken);

      // update new acces token in table user session
      await UserSession.update(
        { access_token: newAccessToken },
        { where: { refresh_token: isRefreshTokenFound.refresh_token } },
      );

      const token = {
        access_token: newAccessToken,
        refresh_token: isRefreshTokenFound.refresh_token,
      };

      return token;
    } catch (err) {
      const error = err as ErrorInterface;
      if (error.name === "TokenExpiredError") {
        // update status menjadi expired
        await UserSession.update(
          { status: "EXPIRED" },
          { where: { refresh_token: isRefreshTokenFound.refresh_token } },
        );
        throw new HttpException(
          status.UNAUTHORIZED,
          "UNAUTHORIZED",
          "Token expired. Please login again.",
        );
      }

      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message,
      );
    }
  };

  public logout = async (refreshToken: string, res: Response): Promise<ApiResponseInterface> => {
    if (isEmpty(refreshToken)) throw new HttpExceptionBadRequest("Refresh token doesn't exist");

    // is refresh token valid
    const storedSession = await this.userSessionRepository.findUserSessionByRefreshToken(
      refreshToken,
    );
    if (!storedSession) throw new HttpExceptionForbidden("Invalid Refresh Token");

    // set session token expired
    await UserSession.update({ status: "EXPIRED" }, { where: { refresh_token: refreshToken } });

    res.clearCookie("access_token");

    return apiResponse(status.OK, "OK", "Logout success");
  };
}

export default AuthService;
