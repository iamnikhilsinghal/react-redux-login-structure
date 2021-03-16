import { all, fork } from "redux-saga/effects";
import rootQuickConnectSaga from "./quickConnect/rootQuickConnectSaga";

export default function* rootHomeSaga() {
  yield all([fork(rootQuickConnectSaga)]);
}
