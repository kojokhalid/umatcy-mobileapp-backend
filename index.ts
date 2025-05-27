const express = require("express");
import { toNodeHandler } from "better-auth/node";
import { auth } from "./middlewares/auth";
const cors = require("cors");
const app = express();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origins: [
      "http://localhost:3000",
      "http://localhost:5173",
      "exp://172.20.10.3:8081",
      "http://localhost:8081",
    ],
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
