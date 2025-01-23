import user from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function generateAccessToken(userName) {
  return jwt.sign(userName, process.env.TOKEN_SECRET);
}

// register
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const generatedToken = generateAccessToken(userName);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = await user.create({
      userName,
      email,
      password: hashedPassword,
      token: generatedToken,
    });

    if (data) {
      res.json({
        status: 201,
        data: data,
        message: "registered successfully",
      });
    } else {
      throw new Error("registration failed ");
    }
  } catch (error) {
    res.json({
      status: 404,
      message: "" + error,
    });
    console.log(error);
  }
};
