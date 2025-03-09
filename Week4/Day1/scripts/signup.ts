document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm") as HTMLFormElement;
    const signupError = document.getElementById("signupError") as HTMLElement;
  
    if (!signupForm || !signupError) return;
  
    signupForm.addEventListener("submit", async (event: Event) => {
      event.preventDefault();
  
      // Collect form input values
      const name = (document.getElementById("signupName") as HTMLInputElement).value.trim();
      const email = (document.getElementById("signupEmail") as HTMLInputElement).value.trim();
      const password = (document.getElementById("signupPassword") as HTMLInputElement).value.trim();
      const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value.trim();
      const address = (document.getElementById("signupAddress") as HTMLInputElement).value.trim();
      const phone = (document.getElementById("signupPhone") as HTMLInputElement).value.trim();
      const website = (document.getElementById("signupWebsite") as HTMLInputElement).value.trim();
      const company = (document.getElementById("signupCompany") as HTMLInputElement).value.trim();
      const role = (document.getElementById("signupRole") as HTMLSelectElement).value;
  
      // Validation: Ensure passwords match
      if (password !== confirmPassword) {
        signupError.textContent = "Passwords do not match!";
        return;
      }
  
      // Validate address structure
      const addressParts = address.split(",").map((part) => part.trim());
      if (addressParts.length < 3) {
        signupError.textContent = "Address must include House No, Street, and City separated by commas.";
        return;
      }
  
      // Construct the new user data object
      const newUser = {
        name,
        email,
        password, // Add any hashing logic here if needed
        address: {
          house: addressParts[0],
          street: addressParts[1],
          city: addressParts[2],
        },
        phone,
        website,
        company,
        role,
      };
  
      try {
        // Send the data to the backend API
        const response = await fetch("http://localhost:3000/employees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
  
        if (!response.ok) {
          throw new Error("Failed to sign up!");
        }
  
        // If successful, redirect or display a success message
        alert("Sign-up successful!");
        window.location.replace("login.html"); // Redirect to login page after successful signup
      } catch (error) {
        console.error("Error signing up:", error);
        signupError.textContent = "An error occurred. Please try again.";
      }
    });
  });
  