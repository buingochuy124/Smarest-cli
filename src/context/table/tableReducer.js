/* eslint-disable default-case */

import { LIST_TABLE, USER_TOKEN } from "./type";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case LIST_TABLE:
      return {
        ...state,
        TablesData: action.payload,
      };
    case USER_TOKEN:
      return {
        ...state,
        userToken: action.payload.message,
        refreshToken: action.payload.refeshToken,
      };
  }
};
