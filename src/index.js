import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { configureStore } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,

  document.getElementById("root")
);
reportWebVitals();
