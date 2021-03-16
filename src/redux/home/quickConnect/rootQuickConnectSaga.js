import { all, fork } from "redux-saga/effects";
import { watchQuickConnectList } from "./quickConnectList";
export default function* rootQuickConnectSaga() {
  yield all([fork(watchQuickConnectList)]);
}
