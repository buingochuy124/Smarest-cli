import React, { useEffect, useReducer } from "react";
import AuthApi from "../../api/AuthApi";
import AuthenContext from "./authContext";
import AuthenReducer from "./authReducer";
import { USER_LOGIN, USER_LOGOUT } from "./types";

const AuthState = (props) => {
  const initialState = {
    isLoggedIn: false,
    userData: {},
    isManager: false,
    userToken: "",
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
      {
        id: 2,
        title: "Register",
        url: "/register",
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

  const loginUser = async (user) => {
    const response = await authApi.login(user);

    if (response.status === 200) {
      console.log(response.data.message);
      dispatch({
        type: USER_LOGIN,
        payload: response.data,
      });
    }
  };
  const logoutUser = async () => {
    const response = await authApi.logout();
    if (response.status === 200) {
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
        shareLinkItems: state.shareLinkItems,
        authLinkItems: state.authLinkItems,
        userToken: state.userToken,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthenContext.Provider>
  );
};

export default AuthState;
