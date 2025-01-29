import express from "express";
import { decodeToken } from "../middleware/decodetoken.js";
import { createNote, deleteNote, getNote, searchNote, updateNote } from "../controllers/noteController.js";
const noteRoute = express.Router();

noteRoute.post("/create",decodeToken,createNote)
noteRoute.get("/get",decodeToken,getNote)
noteRoute.put("/update",decodeToken,updateNote)
noteRoute.delete("/delete",decodeToken,deleteNote)
noteRoute.post("/search",decodeToken,searchNote) 

export default noteRoute;