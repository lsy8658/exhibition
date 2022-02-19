import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./type";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: localStorage.setItem("user", JSON.stringify(action.payload)),
        isFetching: false,
        error: false,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: localStorage.clear(),
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
