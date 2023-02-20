import { ITEM_GET_DRINK, ITEM_GET_FOOD } from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case ITEM_GET_FOOD:
      return {
        ...state,
        listFoods: [],
      };
    case ITEM_GET_DRINK:
      return {
        ...state,
        listFoods: [],
      };

    default:
      return state;
  }
};
