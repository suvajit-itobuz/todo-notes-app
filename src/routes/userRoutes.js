import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { signinUser, signupUser } from "../validators/dataValidation.js";

const route = express.Router();

route.get("/verify", verifyToken);
route.post("/register", validate(signupUser), registerUser);
route.post("/login", validate(signinUser), loginUser);
route.post("/logout",logoutUser)

export default route;
