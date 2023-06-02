import React from "react";
// import "antd/dist/reset.css";

// 引入路由
import { useRoutes } from "react-router-dom";
// 引入组件

import my_route from "./routes";

// import storageUtils from "../../MyReactApp/src/utils/storageUtils";
// 读取local中保存的user
// const user = storageUtils.getUser();
import { ConfigProvider } from "antd";

export default function App() {
  //根据路由表生成对应的路由规则
  const element = useRoutes(my_route);
  return (
    <div className="out">
      {/* 控制主题颜色 */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#023e8a",
          },
        }}
      >
        {/* <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link> */}
        {element}
      </ConfigProvider>
    </div>
  );
}
