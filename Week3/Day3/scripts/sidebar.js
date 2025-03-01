document.addEventListener("DOMContentLoaded", function() {
    // Profile icon click to toggle sidebar
    const profileIcon = document.getElementById("profileIcon");
    const sidebar = document.getElementById("sidebar");
  
    profileIcon.addEventListener("click", function() {
      // Toggle the sidebar visibility
      sidebar.style.display = (sidebar.style.display === "block") ? "none" : "block";
    });
  
    // // Handle the "Update Profile" action
    // document.getElementById("updateProfileBtn").addEventListener("click", function() {
    //   // Redirect to the profile update page
    //   window.location.href = "update_profile.html"; // Adjust to your profile update page
    // });
  
    // Handle the "Logout" action
    document.getElementById("logoutBtn").addEventListener("click", function() {
      localStorage.removeItem("loggedInUser"); // Clear user data from localStorage
      window.location.href = "login.html"; // Redirect to login page
    });

  });
  