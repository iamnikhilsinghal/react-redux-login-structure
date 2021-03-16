import { combineReducers } from "redux";
import loginReducer from "./login";
import logoutReducer from "./logout";

export default combineReducers({
  login: loginReducer,
  logout: logoutReducer,
});
