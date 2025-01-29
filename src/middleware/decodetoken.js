import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";

export const decodeToken = async (req, res, next) => {
  let token;
  try {
    const authHeader = req.headers.authorization;

    if (authHeader.includes("Bearer")) {
      token = authHeader.split(" ")[1];
    } else {
      token = authHeader;
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded) => {
      if (error) {
        console.log(error);
        res.status(401).json({ error: "Unauthorized" });
      } else {
        const { user_id } = decoded;

        const user = await userSchema.findById(user_id);

        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        } else {
          req.userId = user_id;
          next();
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Could not Access",
    });
  }
};
