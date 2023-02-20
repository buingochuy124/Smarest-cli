import React, { useEffect, useReducer } from "react";
import ItemApi from "../../api/ItemApi";
import ItemContext from "./itemContext";
import ItemReducer from "./itemReducer";
import { ITEM_GET_FOOD } from "./types";

const ItemState = (props) => {
  const initialState = {
    listFoods: [],
  };
  const [state, dispatch] = useReducer(ItemReducer, initialState, () => {
    const localState = localStorage.getItem("localState");
    return localState ? JSON.parse(localState) : initialState;
  });
  useEffect(() => {
    localStorage.setItem("localState", JSON.stringify(state));
  }, [state]);

  const itemApi = new ItemApi();
  const getFoods = async () => {
    const response = await itemApi.getFood();

    if (response.status === 200) {
      dispatch({
        type: ITEM_GET_FOOD,
        payload: response.data,
      });
    }
  };
  return (
    <ItemContext.Provider
      value={{
        listFoods: state.listFoods,
        getFoods,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
