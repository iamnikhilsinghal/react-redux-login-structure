export function logout() {
  localStorage.clear();
  window.location = "/";
}

export function setAuthToken(token) {
  localStorage.setItem("authToken", token);
}

export function getAuthToken() {
  return localStorage.getItem("authToken");
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem("user"));
}

export function setUserInfo(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

export default {
  logout,
  setAuthToken,
  getAuthToken,
  setUserInfo,
  getUserInfo,
};
