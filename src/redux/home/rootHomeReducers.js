import { combineReducers } from "redux";
import rootQuickConnectReducer from "./quickConnect/rootQuickReducer";

export default combineReducers({ quickConnect: rootQuickConnectReducer });
