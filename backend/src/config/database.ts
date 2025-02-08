require('dotenv').config()
import mongoose from 'mongoose';

const dbUrl: string = process.env.DB_CONN_STRING as string;

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to the db");
    } catch (err) {
        console.error("Failed to connect to the db", err);
    }
};

export default connectDB;
