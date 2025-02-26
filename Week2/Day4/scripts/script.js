//const API_URL = "https://jsonplaceholder.typicode.com/users";

let employees = [];

// Fetch data from API and render the table
async function fetchEmployees() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    employees = await response.json();
    renderTable();
  } catch (error) {
    console.error("Failed to fetch employees", error);
  }
}
fetchEmployees();

// Render the table
function renderTable() {
  const tableBody = document.getElementById("employeeTableBody");
  tableBody.innerHTML = employees
    .map(
      (employee, index) => `
        <tr>
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.email}</td>
          <td>${employee.address.city}, ${employee.address.street}</td>
          <td>${employee.phone}</td>
          <td>
            <a href="#" class="edit" data-id="${employee.id}"><i class="material-icons">&#xE254;</i></a>
            <a href="#" class="delete" data-id="${employee.id}"><i class="material-icons">&#xE872;</i></a>
          </td>
        </tr>
      `
    )
    .join("");
}
