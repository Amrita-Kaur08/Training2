document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Collect form input values
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const address = document.getElementById('signupAddress').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const website = document.getElementById('signupWebsite').value.trim();
    const company = document.getElementById('signupCompany').value.trim();
    const role = document.getElementById('signupRole').value;

    // Validation
    if (password !== confirmPassword) {
        document.getElementById('signupError').textContent = 'Passwords do not match!';
        return;
    }

    // Construct the new user data object
    const newUser = {
        name,
        email,
        password, // Add any hashing logic here if needed
        address: {
            house: address.split(",")[0].trim(),
            street: address.split(",")[1].trim(),
            city: address.split(",")[2].trim(),
        },
        phone,
        website,
        company,
        role
    };

    try {
        // Send the data to the backend API
        const response = await fetch('http://localhost:3000/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) {
            throw new Error('Failed to sign up!');
        }

        // If successful, redirect or display a success message
        alert('Sign-up successful!');
        window.location.href = 'login.html'; // Redirect to login page after successful signup
    } catch (error) {
        console.error('Error signing up:', error);
        document.getElementById('signupError').textContent = 'An error occurred. Please try again.';
    }
});
