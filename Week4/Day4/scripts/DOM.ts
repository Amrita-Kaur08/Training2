document.addEventListener("DOMContentLoaded", () => {
    const apiService = new ApiService("http://localhost:3000");
    const userManager = new UserManager(apiService);
    userManager.fetchUsersData();
  });
  