"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const db_1 = require("./config/db");
const routes_1 = require("./routes");
const app = express();
//adding middleware
app.use(cors());
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
(0, routes_1.routes)(app);
app.listen(process.env.PORT, () => {
  (0, db_1.ConnnectDB)();
  console.log("server is listning:", process.env.PORT);
});
