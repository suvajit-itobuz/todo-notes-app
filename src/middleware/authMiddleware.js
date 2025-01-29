import jwt from "jsonwebtoken";
import user from "../models/userSchema.js";

export const verifyToken = async (req, res) => {
  let  token= req.headers["authorization"];
  token=token.replace('Bearer',"").trim()

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded) => {
    if (error) {
      console.log(error);
      res.send(
        '"Email verification failed, possibly the link is invalid or expired"'
      );
      res.status(401).json({ error: "Unauthorized" });
    } else {
      await user.findOneAndUpdate(
        { _id: decoded.user_id },
        { $set: { verified: "true", token: null } },
        { new: true }
      );
      res.status(200).json({ message:"Email verified successfully"});

    }
  });
};

// export const verifySession = async (req,res,next) =>{

// }
