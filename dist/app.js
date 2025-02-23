"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
//adding middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.options("*", (0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
(0, routes_1.routes)(app);
app.listen(process.env.PORT, () => {
    (0, db_1.ConnnectDB)();
    console.log("server is listning:", process.env.PORT);
});
