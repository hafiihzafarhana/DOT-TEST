import { Request, Response } from "express";
import cookieParser = require("cookie-parser");
import cors = require("cors");
import express = require("express");
import path from "path";

import { Routes } from "@interfaces/route.interface";
import db from "@config/database";
import errorMiddleware from "@middlewares/error.middleware";
import Limitter from "@middlewares/limitter.middleware";

import { apiNotFoundResponse } from "@/utils/apiResponse.util";
import { StatusCodes as status } from "http-status-codes";
import {
  PORT,
  NODE_ENV,
  // ORIGIN
} from "@/utils/constant.util";

class App {
  public app: express.Application;
  public port: number | string;
  public env: string;
  public limit = new Limitter();

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT || 3000;
    this.env = NODE_ENV || "development";
    this.connectToDB();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeNotFound();
  }

  public ejsSet(): void {
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "templates"));
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private connectToDB(): void {
    db.sequelize.sync({ force: false });
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors({ origin: "*", credentials: true }));
    this.app.use(this.limit.limitter);
    this.app.use(express.static(path.join(__dirname, "../public")));
  }

  private initializeRoutes(routes: Routes[]): void {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private initializeNotFound(): void {
    this.app.use((req: Request, res: Response) =>
      res
        .status(status.NOT_FOUND)
        .json(apiNotFoundResponse("The requested resource could not be found")),
    );
  }
}

export default App;
