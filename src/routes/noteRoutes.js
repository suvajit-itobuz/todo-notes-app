import express from "express";
import { decodeToken } from "../middleware/decodetoken.js";
import { createNote, deleteNote, getNote, updateNote } from "../controllers/noteController.js";
const noteRoute = express.Router();

noteRoute.post("/create",decodeToken,createNote)
noteRoute.get("/get",decodeToken,getNote)
noteRoute.put("/update",updateNote)
noteRoute.delete("/delete",deleteNote)

export default noteRoute;