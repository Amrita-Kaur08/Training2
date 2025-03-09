document.addEventListener("DOMContentLoaded", () => {
    // Profile icon click to toggle sidebar
    const profileIcon = document.getElementById("profileIcon") as HTMLElement;
    const sidebar = document.getElementById("sidebar") as HTMLElement;
    const logoutBtn = document.getElementById("logoutBtn") as HTMLElement;
  
    if (profileIcon && sidebar) {
      profileIcon.addEventListener("click", () => {
        // Toggle sidebar visibility
        sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
      });
    }
  
    // Handle the "Logout" action
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser"); // Clear user data from localStorage
        window.location.href = "login.html"; // Redirect to login page
      });
    }
  });
  