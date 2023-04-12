/* eslint-disable default-case */

import { LIST_ORDER, ORDER_DETAIL } from "./type";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case LIST_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case ORDER_DETAIL:
      return {
        ...state,
        orderDetails: action.payload,
      };
  }
};
