const express = require("express");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));

let submissions = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/submissions", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "submissions.html"));
});

app.post("/submit", (req, res) => {
  const { name, email, age, message } = req.body;

  if (!name || !email || !age) {
    return res.send("<h2 style='color:red;'>❌ Server: All fields are required!</h2>");
  }
  if (!email.includes("@")) {
    return res.send("<h2 style='color:red;'>❌ Server: Invalid email!</h2>");
  }
  if (isNaN(age) || age <= 0) {
    return res.send("<h2 style='color:red;'>❌ Server: Age must be positive!</h2>");
  }

  submissions.push({ name, email, age, message });

  res.sendFile(path.join(__dirname, "views", "result.html"));
});

app.get("/api/submissions", (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
