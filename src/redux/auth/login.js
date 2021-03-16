import { put, takeEvery } from "redux-saga/effects";
import {
  getUserInfo,
  setAuthToken,
  setUserInfo,
} from "../../services/authService";
import { fetchMethod } from "../../services/httpService";
import messagePopup from "../../services/messagePopupService";

// Action Type
export const actionType = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
};

// Actions
export const loginStart = (payload) => ({
  type: actionType.LOGIN_START,
  payload,
});

export const loginSuccess = (user) => ({
  type: actionType.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailed = (data) => ({
  type: actionType.LOGIN_FAILED,
  payload: data,
});

// Reducer
const user = getUserInfo();
const INIT_STATE = user
  ? {
      loading: false,
      isLoggedIn: true,
      user: user,
      error: null,
    }
  : {
      loading: false,
      isLoggedIn: false,
      user: null,
      error: null,
    };
export default function loginReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case actionType.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case actionType.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    default:
      return { ...state };
  }
}

// side effect
export function* loginSaga(action) {
  try {
    const response = yield fetchMethod(
      `/login?email=${action.payload.email}&password=${action.payload.password}&flag=1`,
      null,
      "post",
      false
    );
    if (response.data.statusCode === 401) {
      messagePopup("", response.data.displayMessage, "error");
      yield put(loginFailed(response.data.displayMessage));
    } else {
      if (response.data && response.status === 200) {
        setAuthToken(response.data.token);
        setUserInfo(response.data);
        yield put(loginSuccess(response.data));
        action.payload.history.push("/dashboard");
      }
    }
  } catch (error) {
    messagePopup("", "Login failed", "error");
    yield put(loginFailed("Login failed"));
  }
}

export function* watchLoginSaga() {
  yield takeEvery(actionType.LOGIN_START, loginSaga);
}
