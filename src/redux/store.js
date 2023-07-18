/*
该文件专门用于暴露一个store 对象，整个应用只有一个store对象
 */
// 引入汇总之后的reducer
import allReducer from "./reducers";

// 使用configure store代替createstore
import { legacy_createStore as createStore, applyMiddleware } from "redux";

// 引入redux-thunk 用于支持异步action
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

// 暴露store , applyMiddleware(thunk)
export default createStore(
  allReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
