var loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", loginUsers);
}
function loginUsers(event) {
    event.preventDefault();
    var emailInput = document.getElementById("loginEmail");
    var passwordInput = document.getElementById("loginPassword");
    var message = document.getElementById("loginError");
    if (!emailInput || !passwordInput || !message)
        return;
    var email = emailInput.value.trim();
    var password = passwordInput.value;
    fetch("http://localhost:3000/employees")
        .then(function (res) { return res.json(); })
        .then(function (users) {
        var user = users.find(function (u) { return u.email === email; });
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
        var customer = {
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone,
            address: user.address,
            website: user.website,
            company: user.company,
        };
        localStorage.setItem("loggedInCustomer", JSON.stringify(customer));
        // Redirect based on the user's role
        if (user.role === "customer") {
            window.location.replace("customer.html");
        }
        else if (user.role === "admin" || user.role === "super_admin") {
            window.location.replace("index.html");
        }
        else {
            message.style.color = "red";
            message.innerHTML = "Invalid role!";
        }
    })
        .catch(function (error) {
        console.error("Error logging in:", error);
        message.style.color = "red";
        message.innerHTML = "Login failed!";
    });
}
