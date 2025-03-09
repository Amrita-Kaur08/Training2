const API_URL = "http://localhost:3000/employees";

interface Address {
  house: string;
  street: string;
  city: string;
}

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: Address;
  website: string;
  company: string;
  role: string;
}

let employees: Employee[] = [];

// Preloader
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) preloader.style.display = "none";
  }, 1500);
});


// Generate random 6-digit ID
function generateRandomID(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

// Fetch employees
async function fetchEmployees(): Promise<void> {
  try {
    const response = await fetch(API_URL);
    employees = await response.json();
    renderTable();
  } catch (error) {
    console.error("Failed to fetch employees", error);
  }
}
fetchEmployees();

// Render employee table
function renderTable(): void {
  const tableBody = document.getElementById("employeeTableBody");
  if (!tableBody) return;

  tableBody.innerHTML = employees
    .map(
      (employee) => `
        <tr>
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.email}</td>
          <td>${employee.address.house}, ${employee.address.street}, ${employee.address.city}</td>
          <td>${employee.phone}</td>
          <td><a href="${employee.website}" target="_blank">${employee.website}</a></td>
          <td>${employee.company}</td>
          <td>${employee.role}</td>
          <td>
            <button class="edit" data-id="${employee.id}">Edit</button>
            <button class="delete" data-id="${employee.id}">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");
}

// Form validation
function validateForm(
  name: string,
  email: string,
  phone: string,
  address: string,
  website: string,
  company: string,
  role: string
): boolean {
  const nameRegex = /^[a-zA-Z\s]{3,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const addressParts = address.split(",").map((part) => part.trim());

  if (!nameRegex.test(name)) {
    alert("Name must be between 3 and 50 characters and contain only letters.");
    return false;
  }
  if (!emailRegex.test(email)) {
    alert("Invalid email format!");
    return false;
  }
  if (!phoneRegex.test(phone)) {
    alert("Phone number must be a valid 10-digit Indian number starting with 6-9.");
    return false;
  }
  if (addressParts.length < 3) {
    alert("Address must include House No, Street, and City separated by commas.");
    return false;
  }
  if (!website.trim()) {
    alert("Website cannot be empty.");
    return false;
  }
  if (!company.trim()) {
    alert("Company cannot be empty.");
    return false;
  }
  if (!role) {
    alert("Role must be selected.");
    return false;
  }
  return true;
}

// Add Employee
document.getElementById("addEmployeeForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = generateRandomID();
  const name = (document.getElementById("addName") as HTMLInputElement).value.trim();
  const email = (document.getElementById("addEmail") as HTMLInputElement).value.trim();
  const address = (document.getElementById("addAddress") as HTMLInputElement).value.trim();
  const phone = (document.getElementById("addPhone") as HTMLInputElement).value.trim();
  const website = (document.getElementById("addwebsite") as HTMLInputElement).value.trim();
  const company = (document.getElementById("addCompany") as HTMLInputElement).value.trim();
  const role = (document.getElementById("addRole") as HTMLSelectElement).value;

  if (!validateForm(name, email, phone, address, website, company, role)) return;

  const newEmployee: Employee = {
    id,
    name,
    email,
    address: {
      house: address.split(",")[0].trim(),
      street: address.split(",")[1].trim(),
      city: address.split(",")[2].trim(),
    },
    phone,
    website,
    company,
    role,
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee),
    });

    fetchEmployees();
    closeModal("addEditEmployeeModal");
  } catch (error) {
    console.error("Error adding employee", error);
  }
});

// Delete Employee
document.getElementById("employeeTableBody")?.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;
  if (!target.classList.contains("delete")) return;

  const id = target.getAttribute("data-id");
  if (!id || !confirm("Are you sure you want to delete this employee?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) throw new Error("Failed to delete employee!");

    fetchEmployees();
  } catch (error) {
    console.error("Error deleting employee:", error);
    alert("Failed to delete employee! Please try again.");
  }
});

// Edit Employee
document.getElementById("editEmployeeModal")?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (!target.classList.contains("edit")) return;

  const id = target.getAttribute("data-id");
  const employee = employees.find((emp) => emp.id.toString() === id);

  if (!employee) return;

  (document.getElementById("editId") as HTMLInputElement).value = employee.id.toString();
  (document.getElementById("editName") as HTMLInputElement).value = employee.name;
  (document.getElementById("editEmail") as HTMLInputElement).value = employee.email;
  (document.getElementById("editAddress") as HTMLInputElement).value = `${employee.address.house}, ${employee.address.street}, ${employee.address.city}`;
  (document.getElementById("editPhone") as HTMLInputElement).value = employee.phone;
  (document.getElementById("editWebsite") as HTMLInputElement).value = employee.website;
  (document.getElementById("editCompany") as HTMLInputElement).value = employee.company;
  (document.getElementById("editRole") as HTMLSelectElement).value = employee.role;

  openModal("editEmployeeModal");
});

// Update Employee
document.getElementById("editEmployeeForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const id = (document.getElementById("editId") as HTMLInputElement).value.trim();
  const name = (document.getElementById("editName") as HTMLInputElement).value.trim();

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    fetchEmployees();
    closeModal("editEmployeeModal");
  } catch (error) {
    console.error("Error updating employee:", error);
  }
});

// Modal control functions
function openModal(id: string) {
  document.getElementById(id)?.classList.add("show");
}
function closeModal(id: string) {
  document.getElementById(id)?.classList.remove("show");
}
