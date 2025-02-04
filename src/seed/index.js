import { config } from "dotenv";
import { noteSeed } from "./note-seed.js";
import { userSeed } from "./user-seed.js";
import noteSchema from "../models/noteSchema.js";
import userSchema from "../models/userSchema.js";
import mongoose from "mongoose";

config();

const DB_URL = "mongodb://root:example@localhost:4005/notesApp?authSource=admin"; 

async function dbconnect() {
  try {

    await mongoose.connect(DB_URL);
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Error connecting to the database", e);
  }
}
dbconnect();


const reset = async () => {
  await noteSchema.deleteMany();
  await userSchema.deleteMany();
  console.log("Database reset");

};

const seed = async () => {
  await userSeed(10);
  await noteSeed(20);

};

await reset();
await seed();
