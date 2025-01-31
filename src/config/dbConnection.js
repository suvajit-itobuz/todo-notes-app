import mongoose from "mongoose";
import { config } from "dotenv";
config()
const DB_URL = process.env.DB_URL;

async function dbconnect() {
  try {
    console.log("helo")
    await mongoose.connect(DB_URL).then(console.log("db connected"));
  } catch (e) {
    console.log("error connecting in databases",e);
  }
}

export default dbconnect;
