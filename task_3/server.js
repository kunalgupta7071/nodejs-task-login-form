const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
let submissions = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "result.html"));
});

app.get("/submissions", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "submissions.html"));
});

app.get("/service", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "service.html"));
});

app.post("/submit", (req, res) => {
  const { name, email, age, message } = req.body;

  if (!name || !email || !age) {
    return res.send("<h2 style='color:red;'>❌ All fields required!</h2>");
  }

  submissions.push({ name, email, age, message });
  res.redirect("/result");
});

app.get("/api/submissions", (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
