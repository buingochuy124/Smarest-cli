import axios from "axios";

export default class TableApi {
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

  getListTable = () => {
    const token = JSON.parse(localStorage.getItem("localState")).userToken;
    return this.init().get("/tables", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
  refreshToken = (userRefreshToken) => {
    const token = localStorage.getItem("localState");

    return this.init().post("/auth/refreshToken", userRefreshToken, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token).userToken}`,
        "Content-Type": "application/json",
      },
    });
  };
}
