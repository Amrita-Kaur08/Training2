// login.js

// login.js

document.getElementById("loginForm").addEventListener("submit", loginUser);

function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value;
    let message = document.getElementById("loginError");

    fetch("http://localhost:3000/employees")
        .then(res => res.json())
        .then(users => {
            let user = users.find(user => user.email === email);

            if (!user) {
                message.style.color = "red";
                message.innerHTML = "User not found!";
                return;
            }

            if (user.password !== password) {
                message.style.color = "red";
                message.innerHTML = "Incorrect password!";
                return;
            }

            // Store the user data in localStorage
            const customer = {
                email: user.email,
                name: user.name,
                role: user.role,
                phone: user.phone,
                address: user.address, // Store the address
                website: user.website, // Store the website
                company: user.company, // Store the company
            };

            localStorage.setItem("loggedInCustomer", JSON.stringify(customer));

            // Redirect to customer dashboard
            window.location.replace("customer.html");
        })
        .catch(error => {
            console.error("Error logging in:", error);
            message.style.color = "red";
            message.innerHTML = "Login failed!";
        });
}
