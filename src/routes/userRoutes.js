import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifytoken.js";

const route = express.Router();

route.get("/verify/:token",verifyToken)
route.post("/register", registerUser);
route.post("/login",loginUser)

export default route;
