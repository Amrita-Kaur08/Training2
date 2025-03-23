class UserManager {
    private apiService: ApiService;
  
    constructor(apiService: ApiService) {
      this.apiService = apiService;
    }
  
    fetchUsersData(): void {
      const storedUser = localStorage.getItem("loggedInCustomer");
      if (!storedUser) {
        alert("No user data found. Redirecting to login.");
        window.location.href = "login.html";
        return;
      }
  
      const user: User = JSON.parse(storedUser);
      this.populateUserFields(user);
      this.setupEventListeners(user);
    }
  
    populateUserFields(user: User): void {
      Utils.setTextContent("userName", user.name);
      Utils.setTextContent("userEmail", user.email);
      Utils.setTextContent("userPhone", user.phone);
      Utils.setTextContent("userAddress", Utils.formatAddress(user.address));
      Utils.setTextContent("userWebsite", user.website);
      Utils.setTextContent("userCompany", user.company);
      Utils.setTextContent("userRole", user.role);
    }
  
    setupEventListeners(user: User): void {
      this.setupButton("editButton", () => this.showEditForm(user));
      this.setupButton("logoutButton", this.logoutUser);
      this.setupButton("deleteButton", () => this.confirmDeleteAccount(user.id));
    }
  
    setupButton(buttonId: string, handler: () => void): void {
      const button = document.getElementById(buttonId);
      if (button) {
        button.style.display = "inline-block";
        button.addEventListener("click", handler);
      }
    }
  
    showEditForm(user: User): void {
      Utils.setInputValue("editName", user.name);
      Utils.setInputValue("editEmail", user.email);
      Utils.setInputValue("editPhone", user.phone);
      Utils.setInputValue("editAddress", Utils.formatAddress(user.address));
      Utils.setInputValue("editWebsite", user.website);
      Utils.setInputValue("editCompany", user.company);
      Utils.setInputValue("editRole", user.role);
  
      Utils.toggleElement("editForm", true);
  
      const form = document.getElementById("userEditForm") as HTMLFormElement;
      if (form) {
        form.onsubmit = (event) => {
          event.preventDefault();
          this.updateUserData(user.id, {
            name: Utils.getInputValue("editName"),
            email: Utils.getInputValue("editEmail"),
            phone: Utils.getInputValue("editPhone"),
            address: Utils.parseAddress(Utils.getInputValue("editAddress")),
            website: Utils.getInputValue("editWebsite"),
            company: Utils.getInputValue("editCompany"),
            role: Utils.getInputValue("editRole"),
          });
        };
      }
  
      this.setupButton("cancelEditButton", () => Utils.toggleElement("editForm", false));
    }
  
    async updateUserData(userId: number, updatedUser: Partial<User>): Promise<void> {
      await this.apiService.updateUser(userId, updatedUser);
      localStorage.setItem("loggedInCustomer", JSON.stringify(updatedUser));
      alert("User data updated successfully!");
      location.reload();
    }
  
    logoutUser(): void {
      localStorage.removeItem("loggedInCustomer");
      alert("You have been logged out!");
      window.location.href = "login.html";
    }
  
    confirmDeleteAccount(userId: number): void {
      if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        this.deleteAccount(userId);
      }
    }
  
    async deleteAccount(userId: number): Promise<void> {
      await this.apiService.deleteUser(userId);
      alert("Your account has been deleted!");
      localStorage.removeItem("loggedInCustomer");
      window.location.href = "login.html";
    }
  }
  