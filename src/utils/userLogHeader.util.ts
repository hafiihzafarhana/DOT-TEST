import { userLogHeaderDto } from "@/dtos/userAgent.dto";
import { UserLogHeaderInterface } from "@/interfaces/userLogHeader.interface";
import { Request } from "express";
import { UserAgent } from "express-useragent";

export const getUserLogHeader = (req: Request): userLogHeaderDto | void => {
  const userLogHeader = new UserAgent().parse(
    req.headers["user-agent"] as string,
  ) as UserLogHeaderInterface;

  const userLogHeaderPayload = {
    browser: userLogHeader.browser,
    version: userLogHeader.version,
    os: userLogHeader.os,
    platform: userLogHeader.platform,
    ip_address: req.headers["x-real-ip"] || req.connection.remoteAddress,
    referrer: req.headers.referer,
    source: userLogHeader.source,
  };

  return userLogHeaderPayload;
};
