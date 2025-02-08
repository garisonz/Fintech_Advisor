"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const dbUrl = process.env.DB_CONN_STRING;
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(dbUrl);
        console.log("Connected to the db");
    }
    catch (err) {
        console.error("Failed to connect to the db", err);
    }
};
exports.default = connectDB;
