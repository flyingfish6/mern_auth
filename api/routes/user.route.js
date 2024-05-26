import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", test); //这里的路径代表主路径之后的

export default router;
