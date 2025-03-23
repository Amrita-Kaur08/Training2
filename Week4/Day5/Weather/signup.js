document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Collect form input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    

    // Construct the new user data object
    const newUser = {
        name,
        email,
        password, // Add any hashing logic here if needed
        
    };

    try {
        // Send the data to the backend API
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) {
            throw new Error('Failed to sign up!');
        }

        // If successful, redirect or display a success message
        alert('Sign-up successful!');
        window.location.replace("login.html"); // Redirect to login page after successful signup
    } catch (error) {
        console.error('Error signing up:', error);
        document.getElementById('signupError').textContent = 'An error occurred. Please try again.';
    }
});
