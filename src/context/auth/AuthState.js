import jwt_decode from "jwt-decode";
import React, { useEffect, useReducer } from "react";
import AuthApi from "../../api/AuthApi";
import AuthenContext from "./authContext";
import AuthenReducer from "./authReducer";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_ROLE,
  USER_TABLE,
  USER_TOKEN,
  ADMIN_LOGIN,
  MANAGER_LOGIN
} from "./types";

const AuthState = (props) => {
  const initialState = {
    isLoggedIn: false,
    userData: {},
    tablesData: [],
    role: [],
    userToken: "",
    refreshToken: "",
    userCurrentTable: "",
    shareLinkItems: [
      {
        id: 1,
        title: "Smarest",
        url: "/",
      },
      {
        id: 2,
        title: "About",
        url: "/about",
      },
    ],
    authLinkItems: [
      {
        id: 1,
        title: "Login",
        url: "/login",
      },
    ],
  };
  const [state, dispatch] = useReducer(AuthenReducer, initialState, () => {
    const localState = localStorage.getItem("localState");
    return localState ? JSON.parse(localState) : initialState;
  });
  useEffect(() => {
    localStorage.setItem("localState", JSON.stringify(state));
  }, [state]);

  const authApi = new AuthApi();

  const loginUserWithGoogle = async (credentialResponse) => {
    const response = await authApi.loginWithGoogle(credentialResponse);
    if (response.status === 200) {

      dispatch({
        type: USER_LOGIN,
        payload: response.data,
      });

    }

    const decoded = jwt_decode(response.data.message);
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    dispatch({
      type: USER_ROLE,
      payload: role,
    });

  };

  const loginUser = async (user) => {
    const response = await authApi.login(user);
    if (response.status === 200) {
        dispatch({
          type: USER_LOGIN,
          payload: response.data,
        });
      toast.success("Logged in !!!");
    }
    const decoded = jwt_decode(response.data.message);
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    console.log(role);
    let isAdmin = role[0] === "Admin";

    if(isAdmin){
      dispatch({
        type: ADMIN_LOGIN,
        payload: response.data
      });
    }

    let isManager = role[0] === "Manager";
    if(isManager){
      dispatch({
        type: MANAGER_LOGIN,
        payload: response.data
      });
    }



    dispatch({
      type: USER_ROLE,
      payload: role,
    });
  };

  const userTable = async (table) => {
    dispatch({
      type: USER_TABLE,
      payload: table,
    });
  };

  const refreshTokenIfNeeded = async () => {
    const localState = localStorage.getItem("localState");
    const userData = JSON.parse(localState).userData;
    const decoded = jwt_decode(userData.message);

    if (decoded.exp < (new Date().getTime() + 1) / 1000) {
      const userRefreshToken = {
        UserToken: userData.message,
        RefreshToken: userData.refeshToken,
      };

      const response = await authApi.refreshToken(userRefreshToken);
      console.log(response);

      if (response.status === 200) {
        dispatch({
          type: USER_TOKEN,
          payload: response.data,
        });
      }
    }
  };
  const logoutUser = async () => {
    const response = await authApi.logout();
    if (response.status === 200) {
      toast.success("Logged out !!!");
      dispatch({
        type: USER_LOGOUT,
      });
    }
  };
  return (
    <AuthenContext.Provider
      value={{
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
        tablesData: state.TablesData,
        role: state.role,
        userCurrentTable: state.userCurrentTable,
        shareLinkItems: state.shareLinkItems,
        authLinkItems: state.authLinkItems,
        userToken: state.userToken,
        loginUserWithGoogle,
        refreshTokenIfNeeded,
        userTable,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthenContext.Provider>
  );
};

export default AuthState;
