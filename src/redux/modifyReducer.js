import { MODIFY_START, MODIFY_SUCCESS, MODIFY_FAILURE } from "./type";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

const modifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODIFY_START:
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case MODIFY_SUCCESS:
      return {
        ...state,
        user: localStorage.setItem("user", JSON.stringify(action.payload)),
        isFetching: false,
        error: false,
      };
    case MODIFY_FAILURE:
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default modifyReducer;
