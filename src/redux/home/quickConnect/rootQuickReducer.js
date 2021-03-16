import { combineReducers } from "redux";
import quickConnectListReducer from "./quickConnectList";

export default combineReducers({
  quickConnectList: quickConnectListReducer,
});
