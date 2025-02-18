import {
  RegisterController,
  LoginController,
} from "../../controllers/AuthConroller";

const express = require("express");

const AuthRoutes = express.Router();

AuthRoutes.post("/signup", RegisterController);
AuthRoutes.post("/login", LoginController);

export { AuthRoutes };
