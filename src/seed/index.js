import mongoose from "mongoose";
import { config } from "dotenv";
import { noteSeed } from "./note-seed.js";
import { userSeed } from "./user-seed.js";
import noteSchema from "../models/noteSchema.js";
import userSchema from "../models/userSchema.js";
import dbconnect from "../config/dbConnection.js";
config();

dbconnect();

const seed = async () => {
  await userSeed(10);
  await noteSeed(10);
  mongoose.connection.close();
};

seed();
