import { put, takeEvery } from "redux-saga/effects";
import { logout } from "../../services/authService";
import { fetchMethod } from "../../services/httpService";
import messagePopup from "../../services/messagePopupService";
import history from "../../history";

// Action Type
export const actionType = {
  LOGOUT_START: "LOGOUT_START",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILED: "LOGOUT_FAILED",
};

// Actions
export const logoutStart = (data) => ({
  type: actionType.LOGOUT_START,
  payload: data,
});

export const logoutSuccess = (message) => ({
  type: actionType.LOGOUT_SUCCESS,
  payload: message,
});

export const logoutFailed = (error) => ({
  type: actionType.LOGOUT_FAILED,
  payload: error,
});

const INIT_STATE = {
  loading: false,
  message: null,
  error: null,
};
export default function logoutReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case actionType.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null,
      };
    case actionType.LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        message: null,
        error: action.payload,
      };
    default:
      return { ...state };
  }
}

// side effect

export function* logoutSaga(action) {
  try {
    let userId = [];
    let tableName = [];
    const response = yield fetchMethod(
      `/api/Userdata/deleteDraftUser`,
      {
        userId,
        tableName,
      },
      "post",
      true
    );
    if (response && response.status === 200) {
      logout();
      history.push("/");
      yield put(logoutSuccess("Logout successfully"));
    } else {
      messagePopup("", "Logout failed", "error");
      yield put(logoutFailed("Logout failed"));
    }
  } catch (error) {
    messagePopup("", "Logout failed", "error");
    yield put(logoutFailed("Logout failed"));
  }
}

export function* watchlogoutSaga() {
  yield takeEvery(actionType.LOGOUT_START, logoutSaga);
}
