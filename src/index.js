import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// setup router dom
import { BrowserRouter } from "react-router-dom";

// setup redux-thunk dan createredux
import allReducer from "./redux/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

const golbalStore = createStore(allReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={golbalStore}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
