const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

app.post("/submit", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "❌ All fields are required" });
  }

  users.push({ name, email });
  res.json({ success: true, message: "✅ User registered successfully" });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
