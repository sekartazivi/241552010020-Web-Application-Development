const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route utama
app.get("/", (req, res) => {
    res.send("Todo API berjalan 🚀");
});

// Lokasi database
const dbPath = path.join(__dirname, "db.json");

// Membaca database
function readDB() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ todos: [] }, null, 2));
    }

    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
}

// Menulis database
function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// =======================
// GET Semua Todo
// =======================
app.get("/api/todos", (req, res) => {
    const db = readDB();
    res.json(db.todos);
});

// =======================
// POST Tambah Todo
// =======================
app.post("/api/todos", (req, res) => {

    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    if (!req.body) {
        return res.status(400).json({
            message: "Body request tidak terbaca"
        });
    }

    const { text } = req.body;

    if (!text) {
        return res.status(400).json({
            message: "Text tidak boleh kosong"
        });
    }

    const db = readDB();

    const newTodo = {
        id: Date.now(),
        text,
        done: false
    };

    db.todos.push(newTodo);

    writeDB(db);

    res.status(201).json(newTodo);
});

// =======================
// PATCH Update Todo
// =======================
app.patch("/api/todos/:id", (req, res) => {

    const id = Number(req.params.id);
    const { done } = req.body;

    const db = readDB();

    const todo = db.todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo tidak ditemukan"
        });
    }

    todo.done = done;

    writeDB(db);

    res.json(todo);
});

// =======================
// DELETE Todo
// =======================
app.delete("/api/todos/:id", (req, res) => {

    const id = Number(req.params.id);

    const db = readDB();

    db.todos = db.todos.filter(t => t.id !== id);

    writeDB(db);

    res.json({
        message: "Todo berhasil dihapus"
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});