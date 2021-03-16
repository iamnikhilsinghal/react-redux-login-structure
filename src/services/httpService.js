import axios from "axios";
import swal from "sweetalert";
import authService, { logout } from "./authService";
import { API_URL, GRAPHQL_URL } from "../Config";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    swal("Oops!", "Something went wrong!", "error");
  }
  if (error.response.status === 401) {
    window.location = "/";
    logout();
  }
  return Promise.reject(error);
});

const setAuthTokenHeader = () => {
  const token = authService.getAuthToken();
  if (!token || token === "undefined") {
    window.location = "/";
    logout();
    return null;
  } else {
    return {
      access_token: token,
    };
  }
};

export const fetchMethod = (url, data, method, isAuthToken) => {
  return axios({
    url: API_URL + `${url}`,
    method,
    data,
    headers: isAuthToken ? { ...setAuthTokenHeader() } : null,
  });
};

export const fetchGraphMethod = (
  query,
  variables = null,
  isAuthToken = false
) => {
  let header = {};
  isAuthToken
    ? (header = setAuthTokenHeader() ? { headers: setAuthTokenHeader() } : null)
    : (header = null);
  let body;
  if (variables) {
    body = {
      query,
      variables,
    };
  } else {
    body = {
      query,
    };
  }
  if (header) {
    return axios.post(GRAPHQL_URL, body, header);
  }
  return axios.post(GRAPHQL_URL, body);
};

export default {
  fetchMethod,
  fetchGraphMethod,
};
