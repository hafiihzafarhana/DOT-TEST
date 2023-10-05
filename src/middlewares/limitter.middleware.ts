import { rateLimit } from "express-rate-limit";
import { HttpExceptionTooManyRequests } from "@/exceptions/HttpException";

class Limitter {
  public limitter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 600, // limit each IP to 1000 requests per windowMs
    keyGenerator: (req) => {
      return req.ip + req.headers["user-agent"]; // Menggabungkan alamat IP dan user agent sebagai kunci unik
    },
    handler: () => {
      throw new HttpExceptionTooManyRequests("Too many requests, please try again later.");
    },
  });

  public emailVerificationLimit = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 3,
    keyGenerator: (req) => {
      return req.ip + req.headers["user-agent"]; // Menggabungkan alamat IP dan user agent sebagai kunci unik
    },
    handler: () => {
      throw new HttpExceptionTooManyRequests(
        "Too many requests from this IP, please try again after 3 minutes",
      );
    },
  });

  public passwordResetLimit = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 3,
    keyGenerator: (req) => {
      return req.ip + req.headers["user-agent"]; // Menggabungkan alamat IP dan user agent sebagai kunci unik
    },
    handler: () => {
      throw new HttpExceptionTooManyRequests(
        "Too many requests from this IP, please try again after 3 minutes",
      );
    },
  });
}

export default Limitter;
