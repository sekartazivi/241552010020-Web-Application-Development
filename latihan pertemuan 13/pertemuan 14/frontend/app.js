const API_URL = "http://localhost:3000/api/todos";

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// Ambil semua todo
async function loadTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();

    todoList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        todoList.appendChild(li);
    });
}

// Tambah todo
addBtn.addEventListener("click", async () => {
    const text = todoInput.value.trim();

    if (!text) {
        alert("Masukkan todo terlebih dahulu!");
        return;
    }

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    if (res.ok) {
        todoInput.value = "";
        loadTodos();
    } else {
        alert("Gagal menambahkan todo");
    }
});

// Tekan Enter untuk menambah todo
todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

// Saat halaman dibuka
loadTodos();