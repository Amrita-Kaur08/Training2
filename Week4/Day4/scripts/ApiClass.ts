interface User {
    id: number;
    name: string;
    email: string;
    role: string;
  }
  
  class ApiService {
    private baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    async fetchUsers(): Promise<User[]> {
      const response = await fetch(`${this.baseUrl}/employees`);
      return response.json();
    }
  
    async deleteUser(userId: number): Promise<void> {
      await fetch(`${this.baseUrl}/employees/${userId}`, { method: "DELETE" });
    }
  
    async updateUser(userId: number, updatedUser: Partial<User>): Promise<void> {
      await fetch(`${this.baseUrl}/employees/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
    }
  }
  