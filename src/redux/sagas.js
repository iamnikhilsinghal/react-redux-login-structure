import { all } from "redux-saga/effects";
import rootHomeSaga from "./home/rootHomeSaga";
import rootAuthSaga from "./auth/rootAuthSagas";
export default function* rootSaga() {
  yield all([rootHomeSaga(), rootAuthSaga()]);
}
