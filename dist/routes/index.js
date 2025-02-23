"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const V1_1 = require("./V1");
const routes = (app) => {
    app.use("/health", (req, res) => {
        res.send("Good Health");
        return;
    });
    (0, V1_1.v1Apis)(app);
};
exports.routes = routes;
