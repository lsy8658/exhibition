import { createStore, combineReducers } from "redux";
import loginReducer from "./loginReducer";
import modifyReducer from "./modifyReducer";
const rootReducer = combineReducers({
  loginReducer,
  modifyReducer,
});

export const store = createStore(rootReducer);
