import { Express } from "express";
import session from "express-session";

import { AuthRoutes } from "./auth";

export const v1Apis = function (app: Express) {
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use("/api/v1/auth", AuthRoutes);
};
