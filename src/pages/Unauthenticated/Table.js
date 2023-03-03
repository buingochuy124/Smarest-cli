import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import Share from "../user/Share";

const Table = () => {
  const authContext = useContext(AuthContext);
  const { userTable } = authContext;

  useEffect(() => {
    userTable(window.location.pathname.substring(7));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Share />;
};

export default Table;
