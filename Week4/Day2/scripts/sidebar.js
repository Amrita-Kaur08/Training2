document.addEventListener("DOMContentLoaded", function () {
    // Profile icon click to toggle sidebar
    var profileIcon = document.getElementById("profileIcon");
    var sidebar = document.getElementById("sidebar");
    var logoutBtn = document.getElementById("logoutBtn");
    if (profileIcon && sidebar) {
        profileIcon.addEventListener("click", function () {
            // Toggle sidebar visibility
            sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
        });
    }
    // Handle the "Logout" action
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("loggedInUser"); // Clear user data from localStorage
            window.location.href = "login.html"; // Redirect to login page
        });
    }
});
