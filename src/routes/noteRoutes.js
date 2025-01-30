import express from "express";
import { decodeToken } from "../middleware/decodetoken.js";
import { createNote, deleteNote, getNote, getUsersOffset, searchNote, sortNotes, updateNote } from "../controllers/noteController.js";
const noteRoute = express.Router();

noteRoute.post("/create",decodeToken,createNote)
noteRoute.get("/get",decodeToken,getNote)
noteRoute.put("/update",decodeToken,updateNote)
noteRoute.delete("/delete",decodeToken,deleteNote)
noteRoute.post("/search",decodeToken,searchNote) 
noteRoute.get("/sort",decodeToken,sortNotes)
noteRoute.get("/getuseroffset",decodeToken,getUsersOffset)

export default noteRoute;