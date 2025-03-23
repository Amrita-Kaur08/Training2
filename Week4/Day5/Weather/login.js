
    async function loginUser(event) {
        event.preventDefault(); // Prevent form from refreshing

        let email = document.getElementById("login-email").value.trim();
        let password = document.getElementById("login-password").value;
        let message = document.getElementById("loginError");

        try {
            // Fetch users from JSON database
            let response = await fetch("http://localhost:3000/users"); // Make sure the API URL matches your db.json
            let users = await response.json();
            
            // Check if user exists
            let user = users.find(user => user.email === email && user.password === password);

            if (!user) {
                message.style.color = "red";
                message.innerHTML = "Invalid email or password!";
                return;
            }

            // Store user data in local storage (for session)
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            // Redirect to home page
            window.location.href = "home.html";
        } catch (error) {
            console.error("Error logging in:", error);
            message.style.color = "red";
            message.innerHTML = "Login failed! Try again later.";
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("loginForm").addEventListener("submit", loginUser);
    });

