import UserSession from "@/models/userSession.model";

class UserSessionRepository {
  public findSessionByUserIdStatusUserAgent = async (
    user_id: string,
    parsedUserAgent: string,
  ): Promise<UserSession | null> => {
    return await UserSession.findOne({
      where: { user_id: user_id, status: "ACTIVE", user_agent: parsedUserAgent },
    });
  };

  public createUserSession = async (sessionPayload): Promise<UserSession> => {
    return await UserSession.create(sessionPayload);
  };

  public findAccessToken = async (accessToken: string): Promise<UserSession | null> => {
    return await UserSession.findOne({
      where: { access_token: accessToken, status: "ACTIVE" },
    });
  };

  public findRefreshToken = async (refreshToken: string): Promise<UserSession | null> => {
    return await UserSession.findOne({
      where: { refresh_token: refreshToken, status: "ACTIVE" },
    });
  };

  public findUserSessionByRefreshToken = async (
    refreshToken: string,
  ): Promise<UserSession | null> => {
    return await UserSession.findOne({
      where: { refresh_token: refreshToken },
    });
  };
}

export default UserSessionRepository;
