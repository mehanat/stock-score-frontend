import {ACTIONS} from '../actionType';

const initialState = {
  holdings: [],
};
export const holdingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_ALL_HOLDINGS:
      return {
        ...state,
        holdings: action.payload,
      };
    default:
      return state;
  }
};
