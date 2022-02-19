import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  MODIFY_START,
  MODIFY_SUCCESS,
  MODIFY_FAILURE,
} from "./type";

export const login_start = () => {
  return { type: LOGIN_START };
};

export const login_success = (user) => {
  return { type: LOGIN_SUCCESS, payload: user };
};

export const login_failure = () => {
  return { type: LOGIN_FAILURE };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const modify_start = () => {
  return { type: MODIFY_START };
};
export const modify_success = (user) => {
  return { type: MODIFY_SUCCESS, payload: user };
};
export const modify_failure = () => {
  return { type: MODIFY_FAILURE };
};
