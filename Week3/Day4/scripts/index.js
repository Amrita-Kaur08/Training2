// index.js
document.addEventListener('DOMContentLoaded', () => {
    const domDealer = new DOMDealer();
    const api = new API();
    const validation = Validation;

    // Fetch Employees on page load
    async function loadEmployees() {
        const employees = await api.fetchEmployees();
        domDealer.renderTable(employees);
    }

    loadEmployees();

    // Handle employee form submission (Add Employee)
    document.getElementById('addEmployeeForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get form data
        const name = document.getElementById('addName').value.trim();
        const email = document.getElementById('addEmail').value.trim();
        const phone = document.getElementById('addPhone').value.trim();
        const address = document.getElementById('addAddress').value.trim();
        const website = document.getElementById('addWebsite').value.trim();
        const company = document.getElementById('addCompany').value.trim();
        const role = document.getElementById('addRole').value;

        // Validate form data
        const errorMessage = validation.validateForm(name, email, phone, address, website, company, role);
        if (errorMessage) {
            domDealer.showMessage(errorMessage);
            return;
        }

        // Construct new employee object
        const newEmployee = {
            id: Date.now(), // Using current timestamp as a unique ID
            name,
            email,
            phone,
            address,
            website,
            company,
            role
        };

        // Add employee to the API
        await api.addEmployee(newEmployee);
        loadEmployees(); // Reload employee table
        domDealer.showMessage('Employee added successfully!', 'green');
    });

    // Handle employee delete (clicking on delete button)
    document.getElementById('employeeTableBody').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete')) {
            const id = event.target.getAttribute('data-id');
            const confirmed = confirm('Are you sure you want to delete this employee?');

            if (confirmed) {
                const success = await api.deleteEmployee(id);
                if (success) {
                    domDealer.showMessage('Employee deleted successfully!', 'green');
                    loadEmployees(); // Reload employee table
                } else {
                    domDealer.showMessage('Failed to delete employee!', 'red');
                }
            }
        }
    });
});
