const express = require("express");
import { toNodeHandler } from "better-auth/node";
import dotenv from "dotenv";
dotenv.config();
import { auth } from "./middlewares/auth";
const cors = require("cors");
const app = express();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origins: "*",
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

const UserRoutes = require("./routes/users.route");
app.use("/api/user", UserRoutes);
// app.use("/api/auth", AuthRoutes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
