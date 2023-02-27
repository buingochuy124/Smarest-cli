import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/authContext";

const Table = () => {
  const [tableName, setTableName] = useState("");
  const authContext = useContext(AuthContext);
  const { userTable } = authContext;

  useEffect(() => {
    const tablename = window.location.pathname;
    setTableName(tablename);

    userTable(window.location.pathname.substring(7));
  }, []);

  return (
    <div>
      <h1 className="text-gray-100">{tableName}</h1>;
    </div>
  );
};

export default Table;
