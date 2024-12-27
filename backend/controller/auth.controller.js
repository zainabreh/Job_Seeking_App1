import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

export const signup = async (req, res, next) => {
  let user = req.body;
  try {
    const uploadResult = await cloudinary.uploader
      .upload(req.body.avatar, {
        folder: "job-finding-app",
      })
      .catch((error) => {
        next(error);
      });

    if (uploadResult) {
      user.avatar = uploadResult.secure_url;
      
      let userPassword = user.password;
      user.password = await bcrypt.hash(userPassword, 10);

      await userModel.create(user);

      res.json({
        success: true,
        message: "User signUp",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  let loguser = req.body;

  try {
    if (!loguser.email) return next(new Error("provide Email"));
    if (!loguser.password) return next(new Error("provide Password"));

    let user = await userModel.findOne({ email: loguser.email });

    if (user === null) return next(new Error("Invalid Email"));

    let logpassword = await bcrypt.compare(loguser.password, user.password);

    if (!logpassword) return next(new Error("Invalid Password"));

    let jwt_key = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.roles,
      },
      process.env.TOKEN,
      { expiresIn: "2h" }
    );

    res.cookie("auth", jwt_key, { maxAge: 9000000, httpOnly: true }).json({
      success:true,
      message: "User LogIn",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.cookie("auth", null, { expiresIn: new Date(Date.now()) }).json({//new Date(Date.now())
      message: "logout successfully",
    });
  } catch (error) {
    next(error);
  }
};
