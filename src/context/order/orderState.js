import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import OrderApi from "../../api/OrderApi";
import OrderContext from "./orderContext";
import OrderReducer from "./orderReducer";
import { LIST_ORDER, ORDER_DETAIL } from "./type";

const TableState = (props) => {
  const initialState = {
    tablesData: [],
    userToken: "",
    refreshToken: "",
    orders: [],
    orderDetails: [],
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState, () => {
    const localState = localStorage.getItem("localState");
    return localState ? JSON.parse(localState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("localState", JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const orderApi = new OrderApi();

  const OrdersList = async () => {
    const localState = localStorage.getItem("localState");

    const userData = JSON.parse(localState).userData;

    axios
      .get("https://localhost:44307/api/orders", {
        headers: {
          Authorization: `Bearer ${userData.message}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("data", response.data);
          dispatch({
            type: LIST_ORDER,
            payload: response.data,
          });
        } else {
          toast.error("Some thing wrong !!!");
        }
      })
      .catch((error) => console.log(error));
    //const response = await orderApi.Orders();
    // if (response.status === 200) {
    //   console.log("check", response);
    //   // dispatch({
    //   //   type: LIST_ORDER,
    //   //   payload: response.data,
    //   // });
    // }
  };
  const OrderDetailList = async (orderId) => {
    const localState = localStorage.getItem("localState");
    const userData = JSON.parse(localState).userData;
    axios
      .get("https://localhost:44307/api/orders/" + orderId, {
        headers: {
          Authorization: `Bearer ${userData.message}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("data", response.data);
          dispatch({
            type: ORDER_DETAIL,
            payload: response.data,
          });
        } else {
          toast.error("Some thing wrong !!!");
        }
      })
      .catch((error) => console.log(error));
  };
  const checkOut = async () => {
    const localState = localStorage.getItem("localState");
    const userData = JSON.parse(localState).userData;
    const response = await orderApi.CheckOut(userData.message);

    if (response.status === 200) {
      toast.promise(
        new Promise((resolve) => setTimeout(() => resolve(1), 10000)),
        {
          pending: "Check Out is pending",
          success: "Checked Out",
          error: "error",
        }
      );
      console.log(response);
    } else {
      console.log("check out fail");
    }
  };
  return (
    <OrderContext.Provider
      value={{
        checkOut,
        orders: state.orders,
        orderDetails: state.orderDetails,
        OrdersList,
        OrderDetailList,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default TableState;
