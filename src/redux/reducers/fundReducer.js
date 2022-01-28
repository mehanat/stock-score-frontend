import {ACTIONS} from '../actionType';

const initialState = {
  funds: [],
};
export const fundReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_FUNDS:
      return {
        ...state,
        funds: action.payload,
      };
    default:
      return state;
  }
};
