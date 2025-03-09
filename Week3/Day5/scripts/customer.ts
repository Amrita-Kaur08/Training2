interface Address {
    house: string;
    street: string;
    city: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: Address;
    website: string;
    company: string;
    role: string;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded");
    fetchUsersData();
});

function fetchUsersData(): void {
    const storedUser = localStorage.getItem("loggedInCustomer");
    if (!storedUser) {
        alert("No user data found. Redirecting to login.");
        window.location.href = "login.html";
        return;
    }

    const user: User = JSON.parse(storedUser);
    populateUserFields(user);
    setupEventListeners(user);
}

function populateUserFields(user: User): void {
    setTextContent("userName", user.name);
    setTextContent("userEmail", user.email);
    setTextContent("userPhone", user.phone);
    setTextContent("userAddress", formatAddress(user.address));
    setTextContent("userWebsite", user.website);
    setTextContent("userCompany", user.company);
    setTextContent("userRole", user.role);
}

function setTextContent(elementId: string, value: string): void {
    const element = document.getElementById(elementId);
    if (element) element.textContent = value;
}

function setupEventListeners(user: User): void {
    setupButton("editButton", () => showsEditForm(user));
    setupButton("logoutButton", logoutUsers);
    setupButton("deleteButton", () => confirmDeleteAccounts(user.id));
}

function setupButton(buttonId: string, handler: () => void): void {
    const button = document.getElementById(buttonId);
    if (button) {
        button.style.display = 'inline-block';
        button.addEventListener('click', handler);
    }
}

function showsEditForm(user: User): void {
    setInputValue("editName", user.name);
    setInputValue("editEmail", user.email);
    setInputValue("editPhone", user.phone);
    setInputValue("editAddress", formatAddress(user.address));
    setInputValue("editWebsite", user.website);
    setInputValue("editCompany", user.company);
    setInputValue("editRole", user.role);
    
    toggleElement("editForm", true);

    const form = document.getElementById("userEditForm") as HTMLFormElement;
    if (form) {
        form.onsubmit = (event) => {
            event.preventDefault();
            updateUsersData({
                ...user,
                name: getInputValue("editName"),
                email: getInputValue("editEmail"),
                phone: getInputValue("editPhone"),
                address: parseAddress(getInputValue("editAddress")),
                website: getInputValue("editWebsite"),
                company: getInputValue("editCompany"),
                role: getInputValue("editRole")
            });
        };
    }

    setupButton("cancelEditButton", () => toggleElement("editForm", false));
}

function setInputValue(inputId: string, value: string): void {
    const input = document.getElementById(inputId) as HTMLInputElement;
    if (input) input.value = value;
}

function getInputValue(inputId: string): string {
    const input = document.getElementById(inputId) as HTMLInputElement;
    return input ? input.value : "";
}

function toggleElement(elementId: string, show: boolean): void {
    const element = document.getElementById(elementId);
    if (element) element.style.display = show ? 'block' : 'none';
}

function formatAddress(address: Address): string {
    return `${address.house}, ${address.street}, ${address.city}`;
}

function parseAddress(input: string): Address {
    const [house = "", street = "", city = ""] = input.split(", ");
    return { house, street, city };
}

function updateUsersData(updatedUser: User): void {
    localStorage.setItem("loggedInCustomer", JSON.stringify(updatedUser));
    alert("User data updated successfully!");
    location.reload();
}

function logoutUsers(): void {
    localStorage.removeItem("loggedInCustomer");
    alert("You have been logged out!");
    window.location.href = "login.html";
}

function confirmDeleteAccounts(userId: number): void {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        deleteAccounts(userId);
    }
}

function deleteAccounts(userId: number): void {
    fetch(`http://localhost:3000/employees/${userId}`, { method: 'DELETE' })
    .then(response => {
        if (!response.ok) throw new Error(`Failed to delete account. Server responded with ${response.status}`);
        return response.json();
    })
    .then(() => {
        alert("Your account has been deleted!");
        localStorage.removeItem("loggedInCustomer");
        window.location.href = "login.html";
    })
    .catch(error => {
        alert("There was an error deleting your account: " + error.message);
    });
}
