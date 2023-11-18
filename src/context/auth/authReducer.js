import {
  USER_LOGIN,
  USER_LOGIN_BY_GOOGLE,
  USER_LOGOUT,
  USER_ROLE,
  USER_TABLE,
  ADMIN_LOGIN,
  MANAGER_LOGIN
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
    case MANAGER_LOGIN:
      return {
        ...state,
        shareLinkItems: [
          {
            id: 1,
            title: "ManagerPanel",
            url: "/",
          },
          {
            id: 2,
            title: "Booking List",
            url: "/bookinglist",
          },
          {
            id: 3,
            title: "Orders",
            url: "/orders",
          },

          {
            id: 4,
            title: "Table Manager",
            url: "/tablemanager",
          }

        ],
        authLinkItems: [

        ],
      };
    case ADMIN_LOGIN:
      return {
        ...state,
        shareLinkItems: [
          {
            id: 1,
            title: "AdminPanel",
            url: "/",
          },
          {
            id: 2,
            title: "Dashboard",
            url: "/",
          },
          {
            id: 3,
            title: "Transactions",
            url: "/transactions",
          },

          {
            id: 4,
            title: "Users",
            url: "/users",
          },
          {
            id: 5,
            title: "Items",
            url: "/items",
          },
       
          {
            id: 6,
            title: "tables",
            url: "/tablemanager",
          }

        ],
        authLinkItems: [

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
            url: "/About",
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

    case USER_TABLE:
      return {
        ...state,
        userCurrentTable: action.payload,
      };
    case USER_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};
