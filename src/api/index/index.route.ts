import { Router } from "express";
import { Routes } from "@/interfaces/route.interface";
import IndexController from "@api/index/index.controller";

class IndexRoute implements Routes {
  public path = "/";
  public router = Router();
  public IndexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.IndexController.index);
  }
}

export default IndexRoute;
