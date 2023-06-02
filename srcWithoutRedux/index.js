import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// import storageUtils from "./utils/storageUtils";
// import memoryUtils from "./utils/memoryUtils";
// 读取local中保存的user
// const user = storageUtils.getUser();
// memoryUtils.user = user;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
