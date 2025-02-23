import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import { ConnnectDB } from "./config/db";
import { routes } from "./routes";
dotEnv.config();

const app = express();

//adding middleware
app.use(cors());
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(process.env.PORT, () => {
  ConnnectDB();
  console.log("server is listning:", process.env.PORT);
});
