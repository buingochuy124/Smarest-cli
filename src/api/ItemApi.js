import axios from "axios";

export default class ItemApi {
  constructor() {
    this.client = null;
    this.api_url = "http://103.179.189.219/";
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
