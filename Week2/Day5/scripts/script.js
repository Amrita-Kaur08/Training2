const API_URL = "http://localhost:3000/employees";

function generateRandomID() {
  return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
}

// Fetch employee 
async function fetchEmployees() {
  try {
    const response = await fetch(API_URL);
    employees = await response.json();
    renderTable();
  } catch (error) {
    console.error("Failed to fetch employees", error);
  }
}
fetchEmployees();

// Render the employee table
function renderTable() {
  const tableBody = document.getElementById("employeeTableBody");
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
            <a href="#" class="edit" data-id="${employee.id}"><i class="material-icons">&#xE254;</i></a>
            <a href="#" class="delete" data-id="${employee.id}"><i class="material-icons">&#xE872;</i></a>
          </td>
        </tr>
      `
    )
    .join("");
}

// Validation Function
function validateForm(name, email, phone, address, website, company, role) {
  const nameRegex = /^[a-zA-Z\s]{3,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const addressParts = address.split(",").map(part => part.trim());

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
document.getElementById("addEmployeeForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const id = generateRandomID(); // **Generate a Random Numeric ID**
  const name = document.getElementById("addName").value.trim();
  const email = document.getElementById("addEmail").value.trim();
  const address = document.getElementById("addAddress").value.trim();
  const phone = document.getElementById("addPhone").value.trim();
  const website = document.getElementById("addwebsite").value.trim();
  const company = document.getElementById("addCompany").value.trim();
  const role = document.getElementById("addRole").value;

  // Validate Inputs Before Submitting
  if (!validateForm(name, email, phone, address, website, company, role)) {
    return;
  }

  const newEmployee = {
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

    fetchEmployees(); // Refresh table
    $("#addEditEmployeeModal").modal("hide");
  } catch (error) {
    console.error("Error adding employee", error);
  }
});

// Delete Employee
document.getElementById("employeeTableBody").addEventListener("click", async function (event) {
  const deleteButton = event.target.closest(".delete");
  if (!deleteButton) return;

  let id = deleteButton.dataset.id;
  console.log("Attempting to delete ID:", id);

  if (!id) {
    alert("Error: Employee ID not found.");
    return;
  }

  // Convert ID to a string 
  id = id.toString();

  if (confirm("Are you sure you want to delete this employee?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete employee!");
      }

      console.log(`Employee with ID ${id} deleted successfully.`);
      fetchEmployees(); // Refresh table
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee! Please try again.");
    }
  }
});


// Edit

document.getElementById("employeeTableBody").addEventListener("click", function (event) {
  const editButton = event.target.closest(".edit"); // Find edit button
  if (!editButton) return;

  const id = editButton.dataset.id;
  const employee = employees.find(emp => emp.id == id);

  if (!employee) {
    console.error("Employee not found for editing:", id);
    return;
  }

  // edit form
  document.getElementById("editId").value = employee.id;
  document.getElementById("editName").value = employee.name;
  document.getElementById("editEmail").value = employee.email;
  document.getElementById("editAddress").value = `${employee.address.house}, ${employee.address.street}, ${employee.address.city}`;
  document.getElementById("editPhone").value = employee.phone;
  document.getElementById("editWebsite").value = employee.website;
  document.getElementById("editCompany").value = employee.company;
  document.getElementById("editRole").value = employee.role;

  $("#editEmployeeModal").modal("show"); // Open modal
});

document.getElementById("editEmployeeForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const id = document.getElementById("editId").value.trim();
  const name = document.getElementById("editName").value.trim();
  const email = document.getElementById("editEmail").value.trim();
  const address = document.getElementById("editAddress").value.trim();
  const phone = document.getElementById("editPhone").value.trim();
  const website = document.getElementById("editWebsite").value.trim();
  const company = document.getElementById("editCompany").value.trim();
  const role = document.getElementById("editRole").value;

  if (!validateForm(name, email, phone, address, website, company, role)) {
    return;
  }

  const updatedEmployee = {
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
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEmployee),
    });

    fetchEmployees(); // Refresh table
    $("#editEmployeeModal").modal("hide"); // Close modal
  } catch (error) {
    console.error("Error updating employee:", error);
  }
});


fetchEmployees();