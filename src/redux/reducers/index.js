// 该文件用于汇总一个 reducer 为一个总的 reducer

// 引入 combineReducers 用于汇总多个reducer
import { combineReducers } from "redux";

// 引入为Count组件服务的reducer
import headTitle from "./headTitle";

// 引入为Person组件服务的reducer
import user from "./user";

// 合并reducers 把reducer变成一个对象
const allReducer = combineReducers({
  headTitle,
  user,
});

export default allReducer;
