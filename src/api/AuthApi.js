import axios from "axios";

export default class AuthApi {
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
  register = (user) => {
    return this.init().post("/auth/register", user, { withCredentials: true });
  };

  login = (user) => {
    return this.init().post("/auth/login", user, { withCredentials: true });
  };

  logout = () => {
    return this.init().post("/auth/logout", null, { withCredentials: true });
  };
}
