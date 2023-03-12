import {
  USER_LOGIN,
  USER_LOGIN_BY_GOOGLE,
  USER_LOGOUT,
  USER_TABLE,
} from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
        tablesData: [],

        userToken: action.payload.message,
        refreshToken: action.payload.refreshToken,
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
          {
            id: 3,
            title: "Booking",
            url: "/booking",
          },
        ],
        authLinkItems: [
          {
            id: 1,
            title: "Profile",
            url: "/profile",
          },
          {
            id: 2,
            title: "Cart",
            url: "/cart",
          },
        ],
      };
    case USER_LOGIN_BY_GOOGLE:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
        tablesData: [],
        userToken: action.payload,
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
          {
            id: 3,
            title: "Booking",
            url: "/booking",
          },
        ],
        authLinkItems: [
          {
            id: 1,
            title: "Profile",
            url: "/profile",
          },
          {
            id: 2,
            title: "Cart",
            url: "/cart",
          },
        ],
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userData: {},
        TablesData: [],

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
            url: "/About",
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

    case USER_TABLE:
      return {
        ...state,
        userCurrentTable: action.payload,
      };
    default:
      return state;
  }
};
