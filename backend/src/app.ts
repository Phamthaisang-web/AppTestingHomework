import express from "express";

import userRoutes from "./routes/user.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/users", userRoutes);
export default app;
