import cors from "cors";
// const cors = require('cors')
import express from "express";
// const express = require('express')
import productsRoutes from "./routes/productsRoutes.js"

const app = express();

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500']
}));

app.use("/api/products", productsRoutes);

app.listen(4000, () => {
    console.log("the server is running!")
});