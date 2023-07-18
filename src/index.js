import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// import storageUtils from "./utils/storageUtils";
// import memoryUtils from "./utils/memoryUtils";
// 读取local中保存的user
// const user = storageUtils.getUser();
// memoryUtils.user = user;

const root = ReactDOM.createRoot(document.getElementById("root"));
if (document.readyState === "loading") {
  console.log(document.readyState);
  root.render(<div>加载中……</div>);
} else {
  root.render(
    <React.StrictMode>
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    </React.StrictMode>
  );
}
