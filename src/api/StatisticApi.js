import axios from "axios";

export default class StatisticApi {

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

  dashBoardLineData = async () => {
    const localState = JSON.parse(localStorage.getItem("localState"));

    if (!localState || !localState.userToken) {
      console.error("User token is missing in local state.");
      return; // Handle this error case appropriately
    }

    const userJWT = localState.userToken;


    const response = await this.init().get("/statistic/DashBoardLineData", {
      headers: {
        Authorization: `Bearer ${userJWT}`,
        "Content-Type": "application/json",
      },
    });



    console.log(response.data);

    return response.data;
  }

  dashboardStats = async (dashboardViewModel) => {
    const localState = JSON.parse(localStorage.getItem("localState"));

    if (!localState || !localState.userToken) {
      console.error("User token is missing in local state.");
      return; // Handle this error case appropriately
    }

    const userJWT = localState.userToken;


    const response = await this.init().post("/statistic/dashboardStats", dashboardViewModel, {
      headers: {
        Authorization: `Bearer ${userJWT}`,
        "Content-Type": "application/json",
      },
    });

    // Handle the response data here

    // You can return the response data or do something else with it
    return response.data;

  };




}
