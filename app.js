import express from "express";
import dotenv from "dotenv/config";
import route from "./src/routes/userRoutes.js";
import dbconnect from "./src/config/dbConnection.js";

const PORT = process.env.PORT;
const app =express();

app.use(express.json());
app.use("/", route);

dbconnect()

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
 