import { IsString, IsEmail, MaxLength, IsStrongPassword, IsNotEmpty } from "class-validator";
import { Match } from "@utils/validation/match.decorator";

type IsStrongPasswordOptions = {
  minLength: number;
  minLowercase: number;
  minUppercase: number;
  minNumbers: number;
  minSymbols: number;
};

const strongPasswordOptions: IsStrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0,
};

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: "Auth (Register): Name Required" })
  @MaxLength(255)
  public name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: "Auth (Register): Email Required" })
  @MaxLength(255)
  public email: string;

  @IsString()
  @IsNotEmpty({ message: "Auth (Register): Password Required" })
  @MaxLength(25)
  @IsStrongPassword(strongPasswordOptions)
  public password: string;

  @IsString()
  @IsNotEmpty({ message: "Auth (Register): Password Confirmation Required" })
  @Match("password")
  public password_confirmation: string;

  @IsString()
  @IsNotEmpty({ message: "Auth (Register): Username Confirmation Required" })
  public username: string;
}

export class LoginUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: "Auth (Login): Email Required" })
  @MaxLength(255)
  public email: string;

  @IsString()
  @IsNotEmpty({ message: "Auth (Login): Password Required" })
  @MaxLength(25)
  public password: string;
}

export class TokenRefresherDto {
  @IsString()
  @IsNotEmpty({ message: "Auth (Refresh Token): Refresh Token Required" })
  public refresh_token: string;
}
