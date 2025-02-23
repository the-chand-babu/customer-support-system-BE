"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = express();
//adding middleware
app.use((0, cors_1.default)());
app.use(express.json());
app.options("*", (0, cors_1.default)());
app.use(express.urlencoded({ extended: true }));
(0, routes_1.routes)(app);
app.listen(process.env.PORT, () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.ConnectDB)();
    console.log("server is listning:", process.env.PORT);
  })
);
