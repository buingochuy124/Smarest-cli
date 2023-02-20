import axios from "axios";

export default class ItemApi {
  constructor() {
    this.client = null;
    this.api_url = "https://localhost:44307/api";
  }
  init = () => {
    this.client = new axios.create({
      baseURL: this.api_url,
    });
    return this.client;
  };
  getFood = () => {
    return this.init().get("/items/foods", { withCredentials: true });
  };
}
