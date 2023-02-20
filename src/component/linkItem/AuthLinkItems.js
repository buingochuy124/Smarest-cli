import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import AuthLinkItem from "./AuthLinkItem";
const AuthLinkItems = () => {
  const authContext = useContext(AuthContext);
  const { authLinkItems, isLoggedIn, logoutUser } = authContext;

  const handleLogout = async () => {
    logoutUser();
    if (!isLoggedIn) {
      useHistory.push("/");
    }
  };
  return (
    <ul className="md:flex items-center justify-between text-base text-white pt-4 md:pt-0">
      {authLinkItems.map((item) => (
        <AuthLinkItem key={item.id} url={item.url} title={item.title} />
      ))}
      {isLoggedIn ? (
        <li>
          <button
            className="text-white  p-2 rounded  inline-block no-underline hover:text-red-200 font-medium text-lg py-2 px-4 lg:-ml-2"
            onClick={handleLogout}
          >
            logout
          </button>
        </li>
      ) : null}
    </ul>
  );
};

export default AuthLinkItems;
