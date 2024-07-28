export default class ExternalServices {
    constructor(category) {
      this.category = category;
    }
  
    async getData() {
      try {
        const response = await fetch(`/data/${this.category}.json`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }
  }
  