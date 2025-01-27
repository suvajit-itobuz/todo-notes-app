import user from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendemail from "../emailVerify/verifyEmail.js";

const generateToken = (user_id) => {
  const generatedToken = jwt.sign({ user_id }, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60,
  });
  return generatedToken;
};
// register
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = await user.create({
      userName,
      email,
      password: hashedPassword,
    });

    const generatedToken = generateToken(data._id);

    await user.updateOne({
      $where: {
        _id: data._id,
      },
      data: {
        token: generatedToken,
      },
    });

    if (data) {
      sendemail(email, generatedToken);
      res.json({
        status: 201,
        id: data._id,
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
  }
};

// login

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existing_user = await user.findOne({ email });
    if (!existing_user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: "No user found with the provided email",
      });
    }

    // Compare passwords
    bcrypt.compare(
      req.body.password,
      existing_user.password,
      (err, isMatch) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
            data: "Error comparing passwords",
          });
        }

        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Passwords do not match",
            data: "The password you entered is incorrect",
          });
        } else {
          if (existing_user.verified) {
            const accessToken = generateToken(existing_user._id);
            console.log("accesstoken generated", accessToken);
            res.status(201).json({
              success: true,
              message: "User loggedin successfully.",
            });
          } else {
            res.status(400).json({
              success: false,
              data: "user is not verified",
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: "Internal server error",
    });
  }
};
