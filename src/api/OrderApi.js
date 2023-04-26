import axios from "axios";

export default class OrderApi {
  constructor() {
    this.client = null;
    this.api_url = "http://103.179.189.219/api";
  }

  init = () => {
    this.client = new axios.create({
      baseURL: this.api_url,
    });
    return this.client;
  };
  Orders = () => {
    const token = JSON.parse(localStorage.getItem("localState")).userToken;

    return this.init().get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
  OrderDetails = (orderId) => {
    const token = JSON.parse(localStorage.getItem("localState")).userToken;

    return this.init().get("/orders/" + orderId, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  CheckOut = (accessToken) => {
    const data = {
      AccessToken: accessToken,
    };

    const token = JSON.parse(localStorage.getItem("localState")).userToken;
    return this.init().post("/carts/Checkout", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
}
