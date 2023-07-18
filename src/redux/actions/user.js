import { message } from "antd";
import { reqLogin } from "../../api";
// import { Navigate } from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
import { RECEIVE_USER, SHOW_ERROR_MSG, LOGIN_OUT } from "../constant";
// import store from "../store";

// 分发成功的同步action
export const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });

// 分发错误的信息
export const showErrorMsg = (errorMsg) => ({
  type: SHOW_ERROR_MSG,
  data: errorMsg,
});

// 退出登录
export const loginOut = () => {
  // 删除local中的 user
  storageUtils.removeUser();
  // 返回action对象
  return {
    type: LOGIN_OUT,
  };
};

// 登陆的异步action
export const loginAction = (username, password) => {
  return async (dispatch) => {
    // 1、执行异步ajax请求
    const response = await reqLogin(username, password);
    // 2.1、如果成功，分发成功的同步action
    // 处理登录失败和成功
    const result = response.data;
    if (result.status === 0) {
      // 保存登录状态
      const user = result.data;
      storageUtils.saveUser(user); //保存到local中去
      message.success("登录成功");
      dispatch(receiveUser(user));
      // 2.2、如果失败，分发失败的同步action
    } else {
      message.error(result.msg);
      dispatch(showErrorMsg(result.msg));
    }
  };
};
