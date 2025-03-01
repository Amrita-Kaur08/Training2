// window.addEventListener("load", function () {
//     const customer = JSON.parse(localStorage.getItem("loggedInCustomer")); // Retrieve the customer data from localStorage

//     // Check if customer data exists and has the 'Customer' role
//     if (customer && customer.role === "Customer") {
//         // Find the customer by email from the database or predefined list
//         const user = employees.find(emp => emp.email === customer.email);

//         if (user) {
//             // Display customer details on the page
//             document.getElementById("customerName").textContent = user.name || "N/A";  // Display name if available
//             document.getElementById("customerEmail").textContent = user.email || "N/A";  // Display email if available
//             document.getElementById("customerPhone").textContent = user.phone || "N/A";  // Display phone if available
//         }
//     } else {
//         // If no customer is logged in or the user is not a customer, redirect to login page
//         window.location.replace("login.html");
//     }
// });

// // Logout functionality
// document.getElementById("logout").addEventListener("click", function () {
//     localStorage.removeItem("loggedInCustomer");  // Remove the logged-in customer data
//     window.location.replace("login.html");  // Redirect to login page
// });

// // Update customer details (Redirect to the update form page)
// document.getElementById("updateCustomer").addEventListener("click", function () {
//     window.location.replace("updateCustomer.html");
// });

// // Delete customer account
// document.getElementById("deleteCustomer").addEventListener("click", function () {
//     if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
//         localStorage.removeItem("loggedInCustomer");
//         alert("Your account has been deleted.");
//         window.location.replace("login.html");
//     }
// });


// const API_URL = "http://localhost:3000/employees";

// // Function to get email from URL
// function getUserEmailFromUrl() {
//     const urlParams = new URLSearchParams(window.location.search); // Fixed "Window" to "window"
//     return urlParams.get("email");
// }

// // Function to fetch user data
// function fetchUserData() {
//     const email = getUserEmailFromUrl();
//     if (!email) {
//         alert("No user Email found. Redirecting to login.");
//         window.location.href = "login.html";
//         return;
//     }

//     fetch(`${API_URL}?email=${email}`)
//         .then(response => response.json())
//         .then(users => {
//             if (users.length === 0) {
//                 alert("User not found! Redirecting to login.");
//                 window.location.href = "login.html";
//                 return;
//             }
//             const user = users[0];

//             // Populate user data in the modal form
//             document.getElementById("editUserid").value = user.id;
//             document.getElementById("updateName").value = user.name;
//             document.getElementById("updateEmail").value = user.email;
//             document.getElementById("updateAddress").value = user.address;
//             document.getElementById("updatePhone").value = user.phone;
//             document.getElementById("updateWebsite").value = user.website;
//             document.getElementById("updateCompany").value = user.company;

//             const tablebody = document.querySelector('#user-table-body'); // Fixed selector
//             tablebody.innerHTML = "";
//             const row = document.createElement("tr");
//             row.id = `row-${user.id}`;
//             row.innerHTML = `
//                 <td>${user.id}</td>
//                 <td>${user.name}</td>
//                 <td>${user.email}</td>
//                 <td>${user.address || "N/A"}</td>
//                 <td>${user.role || "N/A"}</td>
//                 <td>${user.phone}</td>
//                 <td><a href="${user.website}" target="_blank">${user.website}</a></td>
//                 <td>${user.company || "N/A"}</td>
//                 <td>
//                     <button class="btn btn-info editBtn" data-id="${user.id}">Edit</button>
//                     <button class="btn btn-danger deleteBtn" data-id="${user.id}">Delete</button>
//                 </td>
//             `;
//             tablebody.appendChild(row);

//             // Event listeners for edit and delete buttons
//             document.querySelectorAll('.deleteBtn').forEach(button => {
//                 button.addEventListener("click", function () {
//                     const userId = this.getAttribute('data-id');
//                     deleteUser(userId);
//                 });
//             });

//             document.querySelectorAll('.editBtn').forEach(button => {
//                 button.addEventListener("click", function () {
//                     const userId = this.getAttribute('data-id');
//                     openEditModal(userId);
//                 });
//             });
//         })
//         .catch(error => {
//             console.error("Error fetching user data:", error);
//         });
// }

// // Function to delete a user
// function deleteUser(id) {
//     if (confirm("Are you sure you want to delete this user")) {
//         fetch(`${API_URL}/${id}`, {
//             method: "DELETE",
//         })
//             .then(response => {
//                 if (response.ok) {
//                     document.getElementById(`row-${id}`).remove();
//                     alert("User deleted successfully");
//                     window.location.href = "login.html";
//                 } else {
//                     alert("Failed to delete user");
//                 }
//             })
//             .catch(error => console.error("Error deleting user:", error));
// }

// // Function to open the modal and populate data for editing
// function openEditModal(userId) {
//     fetch(`${API_URL}/${userId}`)
//         .then(response => response.json())
//         .then(user => {
//             // Populate modal with user data
//             document.getElementById("editId").value = user.id;
//             document.getElementById("editName").value = user.name;
//             document.getElementById("editEmail").value = user.email;
//             document.getElementById("editAddress").value = user.address;
//             document.getElementById("editPhone").value = user.phone;
//             document.getElementById("editWebsite").value = user.website;
//             document.getElementById("editCompany").value = user.company;
//             document.getElementById("editRole").value = user.role;
//             $('#editEmployeeModal').modal('show'); // Show the modal
//         })
//         .catch(error => console.error("Error fetching user data for editing:", error));
// }

// // Form submission for updating user details
// document.getElementById("updateForm").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const userId = document.getElementById("editId").value;
//     const updatedUser = {
//         name: document.getElementById("editName").value,
//         email: document.getElementById("editEmail").value,
//         address: document.getElementById("editAddress").value,
//         phone: document.getElementById("editPhone").value,
//         website: document.getElementById("editWebsite").value,
//         company: document.getElementById("editCompany").value,
//         role: document.getElementById("editRole").value,
//     };

//     fetch(`${API_URL}/${userId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedUser)
//     })
//         .then(response => response.json()) // Fixed typo: "respponse" to "response"
//         .then(updatedUserData => {
//             alert("User updated successfully!");
//             $('#editEmployeeModal').modal('hide'); // Hide the modal
//             updateTableRow(updatedUserData); // Update the row in the table
//         })
//         .catch(error => console.error("Error updating user:", error));
// });

// // Function to update table row after user update
// function updateTableRow(updatedUser) {
//     const row = document.getElementById(`row-${updatedUser.id}`);
//     if (row) {
//         row.cells[1].textContent = updatedUser.name;
//         row.cells[2].textContent = updatedUser.email;
//         row.cells[3].textContent = updatedUser.address;
//         row.cells[5].textContent = updatedUser.phone;
//         row.cells[6].innerHTML = `<a href="${updatedUser.website}" target="_blank">${updatedUser.website}</a>`;
//         row.cells[7].textContent = updatedUser.company;
//         row.cells[4].textContent = updatedUser.role;
//     }
// }

// // Run fetchUserData when the page is ready
// document.addEventListener('DOMContentLoaded', function () {
//     fetchUserData();
// });
// }

// customer.js

// customer.js

// Function to fetch the logged-in user data from localStorage
// Function to fetch the logged-in user data from localStorage
// Function to fetch the logged-in user data from localStorage
// Fetch and display user data on the page
document.addEventListener('DOMContentLoaded', function () {
    console.log("Page loaded");
    fetchUserData();  // Fetch and display the user data when the page loads
});

function fetchUserData() {
    const loggedInCustomer = JSON.parse(localStorage.getItem("loggedInCustomer"));

    // Check if user is logged in
    if (!loggedInCustomer) {
        console.log("No user data found, redirecting to login...");
        alert("No user data found. Redirecting to login.");
        window.location.href = "login.html";  // Redirect to login page
        return;
    }

    // Display the user data
    console.log("User data found:", loggedInCustomer);
    document.getElementById("userName").textContent = loggedInCustomer.name;
    document.getElementById("userEmail").textContent = loggedInCustomer.email;
    document.getElementById("userPhone").textContent = loggedInCustomer.phone;

    const address = loggedInCustomer.address || {};
    const fullAddress = `${address.house || "N/A"}, ${address.street || "N/A"}, ${address.city || "N/A"}`;
    document.getElementById("userAddress").textContent = fullAddress;

    document.getElementById("userWebsite").textContent = loggedInCustomer.website || "N/A";
    document.getElementById("userCompany").textContent = loggedInCustomer.company || "N/A";
    document.getElementById("userRole").textContent = loggedInCustomer.role;

    // Show buttons (Edit, Logout, Delete)
    document.getElementById("editButton").style.display = 'inline-block';
    document.getElementById("logoutButton").style.display = 'inline-block';
    document.getElementById("deleteButton").style.display = 'inline-block';

    // Setup event listeners for buttons
    document.getElementById("editButton").addEventListener('click', () => showEditForm(loggedInCustomer));
    document.getElementById("logoutButton").addEventListener('click', logoutUser);
    document.getElementById("deleteButton").addEventListener('click', () => confirmDeleteAccount(loggedInCustomer.id));
}

// Show the edit form with pre-populated data
function showEditForm(userData) {
    console.log("Showing edit form for:", userData);
    document.getElementById("editName").value = userData.name;
    document.getElementById("editEmail").value = userData.email;
    document.getElementById("editPhone").value = userData.phone;
    document.getElementById("editAddress").value = `${userData.address.house || ""}, ${userData.address.street || ""}, ${userData.address.city || ""}`;
    document.getElementById("editWebsite").value = userData.website;
    document.getElementById("editCompany").value = userData.company;
    document.getElementById("editRole").value = userData.role;

    // Show the edit form
    document.getElementById("editForm").style.display = 'block';

    // Save the updated data when the form is submitted
    document.getElementById("userEditForm").onsubmit = function (event) {
        event.preventDefault(); // Prevent page reload

        const updatedUser = {
            ...userData,
            name: document.getElementById("editName").value,
            email: document.getElementById("editEmail").value,
            phone: document.getElementById("editPhone").value,
            address: document.getElementById("editAddress").value.split(', ').reduce((acc, field, index) => {
                if (index === 0) acc.house = field;
                if (index === 1) acc.street = field;
                if (index === 2) acc.city = field;
                return acc;
            }, {}),
            website: document.getElementById("editWebsite").value,
            company: document.getElementById("editCompany").value,
            role: document.getElementById("editRole").value
        };

        updateUserData(updatedUser); // Update user data
    };

    // Handle the Cancel button
    document.getElementById("cancelEditButton").addEventListener('click', function () {
        document.getElementById("editForm").style.display = 'none';  // Hide the form
    });
}

// Update user data in localStorage
function updateUserData(updatedUser) {
    localStorage.setItem("loggedInCustomer", JSON.stringify(updatedUser));
    alert("User data updated successfully!");
    location.reload(); // Refresh the page
}

// Logout functionality: Clear user data from localStorage
function logoutUser() {
    console.log("Logging out...");
    localStorage.removeItem("loggedInCustomer");
    alert("You have been logged out!");
    window.location.href = "login.html";  // Redirect to login page
}

// Function to confirm account deletion
function confirmDeleteAccount(userId) {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
        deleteAccount(userId);
    } else {
        console.log("Account deletion canceled");
    }
}

// Delete account functionality
function deleteAccount(userId) {
    fetch(`http://localhost:3000/employees/${userId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete account. Server responded with ' + response.status);
        }
        return response.json();  // Parse JSON response if successful
    })
    .then(data => {
        console.log("Account deleted:", data);
        alert("Your account has been deleted!");
        localStorage.removeItem("loggedInCustomer"); // Remove from localStorage
        window.location.href = "login.html"; // Redirect to login page after deletion
    })
    .catch(error => {
        console.error("Error deleting account:", error);
        alert("There was an error deleting your account: " + error.message);
    });
}
