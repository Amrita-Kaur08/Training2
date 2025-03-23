interface Address {
    house: string;
    street: string;
    city: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: Address;
    website: string;
    company: string;
    role: string;
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", loginUsers);
}

function loginUsers(event: Event): void {
    event.preventDefault();

    const emailInput = document.getElementById("loginEmail") as HTMLInputElement;
    const passwordInput = document.getElementById("loginPassword") as HTMLInputElement;
    const message = document.getElementById("loginError") as HTMLElement;

    if (!emailInput || !passwordInput || !message) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    fetch("http://localhost:3000/employees")
        .then(res => res.json())
        .then((users: User[]) => {
            const user = users.find(u => u.email === email);

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
                address: user.address, 
                website: user.website,
                company: user.company,
            };

            localStorage.setItem("loggedInCustomer", JSON.stringify(customer));

            // Redirect based on the user's role
            if (user.role === "customer") {
                window.location.replace("customer.html");
            } else if (user.role === "admin" || user.role === "super_admin") {
                window.location.replace("index.html");
            } else {
                message.style.color = "red";
                message.innerHTML = "Invalid role!";
            }
        })
        .catch(error => {
            console.error("Error logging in:", error);
            message.style.color = "red";
            message.innerHTML = "Login failed!";
        });
}
