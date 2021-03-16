import { put, takeEvery } from "redux-saga/effects";
import { fetchGraphMethod } from "../../../services/httpService";
import messagePopup from "../../../services/messagePopupService";

/* ======================================= Actions Type ==========================================*/
export const actionType = {
  GET_QUICK_CONNECT_LIST_START: "GET_QUICK_CONNECT_LIST_START",
  QUICK_CONNECT_LIST_SUCCESS: "QUICK_CONNECT_LIST_SUCCESS",
  QUICK_CONNECT_LIST_FAILURE: "QUICK_CONNECT_LIST_FAILURE",
};

/* ======================================= Actions Creator ==========================================*/

export const getQuickConnectListStart = (data) => ({
  type: actionType.GET_QUICK_CONNECT_LIST_START,
  payload: data,
});

export const QuickConnectListSuccess = (data) => ({
  type: actionType.QUICK_CONNECT_LIST_SUCCESS,
  payload: data,
});

export const QuickConnectListFailure = (data) => ({
  type: actionType.QUICK_CONNECT_LIST_FAILURE,
  payload: data,
});

/* ======================================= Reducer ==========================================*/
const INIT_STATE = {
  loading: false,
  data: null,
  error: null,
};
export default function quickConnectListReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case actionType.GET_QUICK_CONNECT_LIST_START:
      return { ...state, loading: true };

    case actionType.QUICK_CONNECT_LIST_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };

    case actionType.QUICK_CONNECT_LIST_FAILURE:
      return { ...state, loading: false, data: null, error: action.payload };

    default:
      return { ...state };
  }
}

/* ======================================= Side Effects ==========================================*/

function* getQuickConnectListSaga(action) {
  try {
    const response = yield fetchGraphMethod(
      action.payload.query,
      action.payload.variables,
      true
    );
    if (response.status === 200) {
      console.log("response", response);
      let allQuickconnects = response.data.data.allQuickconnects.Quickconnects;
      allQuickconnects = allQuickconnects
        .map((item, index) => {
          if (item.wanttoconnectedwithotherpeople) {
            item.wanttoconnectedwithotherpeople =
              item.wanttoconnectedwithotherpeople === 1 ? "Yes" : "No";
          }
          if (item.wanttoconnectedwithotherpeoplehavesimilarinterests) {
            item.wanttoconnectedwithotherpeoplehavesimilarinterests =
              item.wanttoconnectedwithotherpeoplehavesimilarinterests === 1
                ? "Yes"
                : "No";
          }
          if (item.wanttoconnectedwithotherpeopleareinsamearea) {
            item.wanttoconnectedwithotherpeopleareinsamearea =
              item.wanttoconnectedwithotherpeopleareinsamearea === 1
                ? "Yes"
                : "No";
          }
          if (item.wanttoconnectedwithotherpeoplevirtually) {
            item.wanttoconnectedwithotherpeoplevirtually =
              item.wanttoconnectedwithotherpeoplevirtually === 1
                ? "Yes"
                : item.wanttoconnectedwithotherpeoplevirtually === 2
                ? "No"
                : item.wanttoconnectedwithotherpeoplevirtually === 3
                ? "Sometimes"
                : "";
          }
          if (item.wanttoconnectedwithotherpeoplehavesimilargoal) {
            item.wanttoconnectedwithotherpeoplehavesimilargoal =
              item.wanttoconnectedwithotherpeoplehavesimilargoal === 1
                ? "Yes"
                : "No";
          }
          return item;
        })
        .reverse();
      yield put(QuickConnectListSuccess(allQuickconnects));
    } else {
      messagePopup("", "Fetch Quick Connect List Data Failed", "error");
      yield put(QuickConnectListFailure("Failed, Error occured"));
    }
  } catch (error) {
    messagePopup("", "Fetch Quick Connect List Data Failed", "error");
    yield put(QuickConnectListFailure("Failed, Error occured"));
  }
}

export function* watchQuickConnectList() {
  yield takeEvery(
    actionType.GET_QUICK_CONNECT_LIST_START,
    getQuickConnectListSaga
  );
}
