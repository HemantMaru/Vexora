import userModel from "../models/auth.models.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
export const authRegister = async (req, res) => {
  const { fullname, email, contact, password, isSeller } = req.body;
  try {
    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User with this email or contact already exists",
      });
    }
    const user = await userModel.create({
      fullname,
      email,
      contact,
      password,
      role: isSeller ? "seller" : "buyer",
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.JWT_SECRET,
      {
        expiresIn: "5d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User register successfully",
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const authLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    console.log("identifier:", identifier);
    console.log("password:", password);
    const cleanIdentifier = identifier.trim();
    const isNumber = !isNaN(cleanIdentifier);

    const user = await userModel
      .findOne({
        $or: [
          { email: cleanIdentifier },
          ...(isNumber ? [{ contact: Number(cleanIdentifier) }] : []),
        ],
      })
      .select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      config.JWT_SECRET,
      {
        expiresIn: "5d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User login successfully",
      fullname: user.fullname,
      email: user.email,
      contact: user.contact,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

export const getme = async (req, res) => {
  try {
    const userId = req.user;
    const user = await userModel.findById(userId._id);

    res.status(201).json({
      message: "User fetched successfully",
      user: {
        id: user._id,
        email: user.email,
        contact: user.contact,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};
