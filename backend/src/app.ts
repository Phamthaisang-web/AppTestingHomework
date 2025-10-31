import express from "express";
import userRoutes from "./routes/user.route"; // nhớ thêm .js nếu dùng module type
import dotenv from "dotenv";
import cors from "cors"; // <--- thêm dòng này
import errorHandler from "./middlewares/error.middleware";

dotenv.config();

const app = express();

// Thêm CORS middleware
app.use(cors()); // <--- thêm dòng này

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/users", userRoutes);
app.use(errorHandler);
export default app;
