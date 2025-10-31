import mongoose from "mongoose";
import app from "./app";

const PORT = 8080;
console.log("<<=== 🚀 Starting server ===>>", 3000);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
