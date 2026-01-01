import cors from "cors"; // same as const cors = require('cors')
import express from "express"; // same as const express = require('express')
import productsRoutes from "./routes/productsRoutes.js"
import {connectDB} from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"

const app = express();

connectDB();

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));

// middleware
app.use(express.json());
app.use(rateLimiter);

app.use("/api/products", productsRoutes);

app.listen(4000, () => {
    console.log("the server is running!")
});