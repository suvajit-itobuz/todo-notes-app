import express from "express";
import { registerUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifytoken.js";

const route = express.Router();

route.post("/register", registerUser);
route.get("/verify/:token",verifyToken)

export default route;
