import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connect mgdb");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json()); //可以接收json格式的数据
app.listen(3000, () => {
  console.log("服务器启动3000端口");
});

app.use("/api/user", userRoutes); //这里的路径代表开头，即3000后的
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "网络超时";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
