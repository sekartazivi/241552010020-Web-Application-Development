// index.js
require('dotenv').config(); // ← HARUS PALING PERTAMA
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global — agar bisa baca req.body
app.use(express.json());

// Routes
const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

// Global error handler — HARUS PALING BAWAH
app.use((err, req, res, next) => {
    console.error(err);
res.status(err.status || 500)
    .json({ error: err.message || 'Server error' });
});
app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
});