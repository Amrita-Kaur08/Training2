interface Address {
    house: string;
    street: string;
    city: string;
  }
  
  class Utils {
    static setTextContent(elementId: string, value: string): void {
      const element = document.getElementById(elementId);
      if (element) element.textContent = value;
    }
  
    static setInputValue(inputId: string, value: string): void {
      const input = document.getElementById(inputId) as HTMLInputElement;
      if (input) input.value = value;
    }
  
    static getInputValue(inputId: string): string {
      const input = document.getElementById(inputId) as HTMLInputElement;
      return input ? input.value : "";
    }
  
    static toggleElement(elementId: string, show: boolean): void {
      const element = document.getElementById(elementId);
      if (element) element.style.display = show ? "block" : "none";
    }
  
    static formatAddress(address: Address): string {
      return `${address.house}, ${address.street}, ${address.city}`;
    }
  
    static parseAddress(input: string): Address {
      const [house = "", street = "", city = ""] = input.split(", ");
      return { house, street, city };
    }
  }
  