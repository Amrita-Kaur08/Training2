// api.js
class API {
    // Fetch employees data from the server
    static async fetchEmployees() {
        try {
            const response = await fetch('http://localhost:3000/employees');
            return await response.json();
        } catch (error) {
            console.error("Error fetching employees:", error);
            return [];
        }
    }

    // Add a new employee to the server
    static async addEmployee(employee) {
        try {
            const response = await fetch('http://localhost:3000/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });
            return await response.json();
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    }

    // Delete an employee by ID
    static async deleteEmployee(id) {
        try {
            const response = await fetch(`http://localhost:3000/employees/${id}`, {
                method: 'DELETE'
            });
            return response.ok; // Return success or failure
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }
}
