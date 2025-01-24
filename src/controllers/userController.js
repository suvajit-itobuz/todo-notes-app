import user from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendemail from "../emailVerify/verifyEmail.js";

// register
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName);
    const generatedToken = jwt.sign({userName}, process.env.TOKEN_SECRET, {
      expiresIn: "10m",
    });
    console.log(generatedToken);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = await user.create({
      userName,
      email,
      password: hashedPassword,
      token: generatedToken,
    });

    if (data) {
      sendemail(email, generatedToken);
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

