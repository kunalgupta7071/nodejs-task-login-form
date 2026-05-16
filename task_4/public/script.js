const app = document.getElementById("app");
const routes = {
  register: `
    <div class="card p-4 mx-auto" style="max-width: 420px;">
      <h3 class="text-center text-success mb-3">📝 Register</h3>
      <form id="registerForm">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name">
          <small class="text-danger" id="nameError"></small>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email">
          <small class="text-danger" id="emailError"></small>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" id="password" name="password" placeholder="Enter a strong password">
          <div class="strength mt-1" id="strengthBar"></div>
          <small class="text-danger" id="passwordError"></small>
        </div>
        <div class="mb-3">
          <label class="form-label">Confirm Password</label>
          <input type="password" class="form-control" id="confirmPassword" placeholder="Re-enter password">
          <small class="text-danger" id="confirmError"></small>
        </div>
        <button type="submit" class="btn btn-success w-100">Register</button>
      </form>
    </div>
  `,
  users: `
    <h3 class="text-white mb-3">👥 Registered Users</h3>
    <div id="usersList" class="row g-4 justify-content-center"></div>
  `
};

// Router
function navigate(route) {
  app.innerHTML = routes[route];
  if (route === "register") initForm();
  if (route === "users") loadUsers();
}

document.querySelectorAll("[data-route]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    navigate(btn.getAttribute("data-route"));
  });
});

navigate("register");

function initForm() {
  const form = document.getElementById("registerForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const strengthBar = document.getElementById("strengthBar");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("confirmError").innerText = "";

    let valid = true;

    if (nameInput.value.trim().length < 3) {
      document.getElementById("nameError").innerText = "⚠ Name must be at least 3 characters";
      valid = false;
    }

    if (!emailInput.value.includes("@")) {
      document.getElementById("emailError").innerText = "⚠ Invalid email";
      valid = false;
    }

    if (passwordInput.value.length < 6) {
      document.getElementById("passwordError").innerText = "⚠ Min 6 characters";
      valid = false;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      document.getElementById("confirmError").innerText = "⚠ Passwords do not match";
      valid = false;
    }

    if (!valid) return;

    let res = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      })
    });
    let data = await res.json();
    if (data.success) {
      alert("✅ Registered Successfully!");
      navigate("users");
    }
  });

  passwordInput.addEventListener("input", () => {
    let val = passwordInput.value;
    if (val.length < 6) {
      strengthBar.className = "strength weak";
    } else if (val.match(/[A-Z]/) && val.match(/[0-9]/)) {
      strengthBar.className = "strength strong";
    } else {
      strengthBar.className = "strength medium";
    }
  });
}

async function loadUsers() {
  let res = await fetch("/api/users");
  let users = await res.json();
  let list = document.getElementById("usersList");
  list.innerHTML = "";
  users.forEach(u => {
    list.innerHTML += `
      <div class="col-md-4">
        <div class="card shadow h-100">
          <div class="card-body">
            <h5 class="text-success">${u.name}</h5>
            <p><b>Email:</b> ${u.email}</p>
          </div>
        </div>
      </div>
    `;
  });
}
