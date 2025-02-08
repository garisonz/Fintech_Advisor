// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Load env variables first
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB().then(() => {
    // Only start server after DB connection is established
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});

app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});