import { UserAgentDto } from "@dtos/userAgent.dto";
import { Request } from "express";
import { UserAgentInterface } from "@interfaces/usserAgent.interface";
import { UserAgent } from "express-useragent";

export const getUserAgent = (req: Request): UserAgentDto => {
  // Set user agent data
  const useragent = new UserAgent().parse(
    req.headers["user-agent"] as string,
  ) as UserAgentInterface;
  const userAgentPayload = {
    browser: useragent.browser,
    version: useragent.version,
    os: useragent.os,
  };

  return userAgentPayload;
};
