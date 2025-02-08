// src/config/database.ts
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load env variables
dotenv.config();

const dbUrl = process.env.DB_CONN_STRING;

if (!dbUrl) {
    console.error("DB_CONN_STRING is not defined in environment variables");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to the db");
    } catch (err) {
        console.error("Failed to connect to the db", err);
        process.exit(1);
    }
};

export default connectDB;