import { User } from "../models/user.modle.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  //   console.log(req.body);
  //   res.json({ message: "API for signin" });
  const { username, email, password } = req.body;
  const hanshedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hanshedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user is created" });
  } catch (error) {
    next(errorHandle(500, "用户已存在"));
  }
};
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 36000000); // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
