import { combineReducers } from "redux";
import rootAuthReducers from "./auth/rootAuthReducers";
import rootHomeReducers from "./home/rootHomeReducers";

export default combineReducers({
  home: rootHomeReducers,
  auth: rootAuthReducers,
});
