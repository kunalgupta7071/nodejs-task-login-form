const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");
const tableBody = document.getElementById("studentTable");

async function fetchStudents() {
  const res = await fetch("/api/students");
  const students = await res.json();
  renderStudents(students);
}

function renderStudents(students) {
  tableBody.innerHTML = "";
  students.forEach(student => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2 edit-btn" data-id="${student.id}">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn" data-id="${student.id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

//  CREATE
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const student = {
    name: nameInput.value.trim(),
    age: ageInput.value.trim(),
    course: courseInput.value.trim()
  };
  await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });
  form.reset();
  fetchStudents();
});

//  UPDATE + DELETE
tableBody.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    fetchStudents();
  }

  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.dataset.id;
    const newName = prompt("Enter new name:");
    const newAge = prompt("Enter new age:");
    const newCourse = prompt("Enter new course:");

    if (newName && newAge && newCourse) {
      await fetch(`/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, age: newAge, course: newCourse })
      });
      fetchStudents();
    }
  }
});

fetchStudents();
