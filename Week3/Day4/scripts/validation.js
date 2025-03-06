// validation.js
class Validation {
    // Static method to validate form data
    static validateForm(name, email, phone, address, website, company, role) {
        const nameRegex = /^[a-zA-Z\s]{3,50}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/;

        // Validation checks for each field
        if (!nameRegex.test(name)) {
            return "Name must be between 3 and 50 characters and contain only letters.";
        }
        if (!emailRegex.test(email)) {
            return "Invalid email format!";
        }
        if (!phoneRegex.test(phone)) {
            return "Phone number must be valid (10-digit number starting with 6-9).";
        }
        if (address.split(',').length < 3) {
            return "Address must include House No, Street, and City separated by commas.";
        }
        if (!website.trim()) {
            return "Website cannot be empty.";
        }
        if (!company.trim()) {
            return "Company cannot be empty.";
        }
        if (!role) {
            return "Role must be selected.";
        }
        return null; // If no validation errors, return null
    }
}
