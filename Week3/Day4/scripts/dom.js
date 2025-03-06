// dom.js
class DOMDealer {
    constructor() {
        this.tableBody = document.getElementById('employeeTableBody');
    }

    // Method to render employees into the table
    renderTable(employees) {
        this.tableBody.innerHTML = employees
            .map(
                (employee) => `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.address}</td>
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
            .join('');
    }

    // Method to show success or error messages
    showMessage(message, color = 'red') {
        const messageDiv = document.getElementById('message');
        messageDiv.innerText = message;
        messageDiv.style.color = color;
    }
}
