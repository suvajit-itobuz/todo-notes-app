import express from "express";
import {config} from "dotenv";
config();
import route from "./src/routes/userRoutes.js";
import dbconnect from "./src/config/dbConnection.js";
import noteRoute from "./src/routes/noteRoutes.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/", route);
app.use("/note",noteRoute)

dbconnect();

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});


