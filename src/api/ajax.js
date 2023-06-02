import axios from "axios";

// 优化的界面提示
import { message } from "antd";

// 专门用来发送异步ajax请求的模块
// 用axios封装了ajax 函数
export default function ajax(url, data = {}, type = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    // 发送get请求
    if (type === "GET") {
      promise = axios.get(url, {
        params: data,
      });
    }
    // 发送post请求
    else {
      promise = axios.post(url, data);
    }

    promise
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        message.error("请求失败！" + err.message);
      });
  });
}
