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
  refreshToken = (userRefreshToken) => {
    const token = localStorage.getItem("localState");

    return this.init().post("/auth/refreshToken", userRefreshToken, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token).userToken}`,
        "Content-Type": "application/json",
      },
    });
  };
  loginWithGoogle = (credentialResponse) => {
    return this.init().post("/auth/google", credentialResponse, {
      withCredentials: true,
    });
  };
}
