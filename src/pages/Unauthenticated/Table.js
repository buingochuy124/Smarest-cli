import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Table = () => {
  const authContext = useContext(AuthContext);
  const { userTable } = authContext;

  useEffect(() => {
    userTable(window.location.pathname.substring(7));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return window.location.replace('http://localhost:3000/');
};

export default Table;
