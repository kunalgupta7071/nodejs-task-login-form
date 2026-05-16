const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3004;

app.use(bodyParser.json());
app.use(express.static("public"));

let students = [];
let idCounter = 1;

app.post("/api/students", (req, res) => {
  const student = { 
    id: idCounter++, 
    name: req.body.name, 
    age: req.body.age, 
    course: req.body.course 
  };
  students.push(student);
  res.json(student);
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);
  if (student) {
    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
