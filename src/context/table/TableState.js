import jwt_decode from "jwt-decode";
import React, { useEffect, useReducer } from "react";
import TableApi from "../../api/TableApi";
import TableContext from "./tableContext";
import TableReducer from "./tableReducer";
import { LIST_TABLE, USER_TOKEN } from "./type";

const TableState = (props) => {
  const initialState = {
    TablesData: [],
    userToken: "",
    refreshToken: "",
  };

  const [state, dispatch] = useReducer(TableReducer, initialState, () => {
    const localState = localStorage.getItem("localState");
    return localState ? JSON.parse(localState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("localState", JSON.stringify(state));
    refreshTokenIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const tableApi = new TableApi();

  const listTable = async () => {
    const response = await tableApi.getListTable();
    if (response.status === 200) {
      dispatch({
        type: LIST_TABLE,
        payload: response.data,
      });
    }
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

      const response = await tableApi.refreshToken(userRefreshToken);
      console.log(response);
      if (response.status === 200) {
        dispatch({
          type: USER_TOKEN,
          payload: response.data,
        });
      }
    }
  };

  return (
    <TableContext.Provider
      value={{
        TablesData: state.TablesData,
        userToken: state.userToken,
        refreshToken: state.refreshToken,
        refreshTokenIfNeeded,
        listTable,
      }}
    >
      {props.children}
    </TableContext.Provider>
  );
};

export default TableState;
