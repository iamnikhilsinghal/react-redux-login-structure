import { all, fork } from "redux-saga/effects";
import { watchLoginSaga } from "./login";
import { watchlogoutSaga } from "./logout";
export default function* rootAuthSaga() {
  yield all([
    fork(watchLoginSaga),
    fork(watchlogoutSaga),
  ]);
}
