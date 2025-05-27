import UsersController from "../controllers/users";
const express = require("express");
const UserRoutes = express.Router();

UserRoutes.get("/", UsersController);
module.exports = UserRoutes;
