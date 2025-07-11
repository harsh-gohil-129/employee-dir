let currentPage = 1;
const perPage = 4;

function renderEmployees() {
  const list = document.getElementById("employee-list");
  const search = document.getElementById("search").value.toLowerCase();
  const filtered = mockEmployees.filter(
    (e) =>
      e.firstName.toLowerCase().includes(search) ||
      e.lastName.toLowerCase().includes(search) ||
      e.email.toLowerCase().includes(search)
  );
  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  list.innerHTML = paginated
    .map(
      (emp) => `
    <div class="employee-card">
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>${emp.email}</p>
      <p>${emp.department} - ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    </div>
  `
    )
    .join("");

  renderPagination(filtered.length);
}

function renderPagination(total) {
  const pageCount = Math.ceil(total / perPage);
  const pagination = document.getElementById("pagination");
  let buttons = "";
  for (let i = 1; i <= pageCount; i++) {
    buttons += `<button onclick="goToPage(${i})" class="${
      i === currentPage ? "active" : ""
    }">${i}</button>`;
  }
  pagination.innerHTML = buttons;
}

function goToPage(page) {
  currentPage = page;
  renderEmployees();
}

function showForm() {
  document.getElementById("form-container").classList.remove("hidden");
  document.getElementById("employee-form").reset();
  document.getElementById("form-title").innerText = "Add Employee";
}

function cancelForm() {
  document.getElementById("form-container").classList.add("hidden");
}

function editEmployee(id) {
  const emp = mockEmployees.find((e) => e.id === id);
  if (emp) {
    showForm();
    document.getElementById("form-title").innerText = "Edit Employee";
    document.getElementById("employee-id").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;
  }
}

function deleteEmployee(id) {
  if (confirm("Are you sure you want to delete?")) {
    mockEmployees = mockEmployees.filter((e) => e.id !== id);
    renderEmployees();
  }
}

// Handle form submit
const form = document.getElementById("employee-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("employee-id").value;
  const newEmp = {
    id: id ? Number(id) : Date.now(),
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    department: document.getElementById("department").value,
    role: document.getElementById("role").value,
  };

  if (id) {
    const index = mockEmployees.findIndex((e) => e.id == id);
    mockEmployees[index] = newEmp;
  } else {
    mockEmployees.push(newEmp);
  }

  cancelForm();
  renderEmployees();
});

// Search
document.getElementById("search").addEventListener("input", () => {
  currentPage = 1;
  renderEmployees();
});

renderEmployees();
