import { SignUp, SignIn } from "../controllers/auths";
const express = require("express");
const AuthRoutes = express.Router();

AuthRoutes.post("/sign-up", SignUp);
AuthRoutes.post("/sign-up", SignIn);
module.exports = AuthRoutes;
