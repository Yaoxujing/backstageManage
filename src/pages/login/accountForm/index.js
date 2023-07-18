import React from "react";
// 引入antd
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Tabs } from "antd";
// 引入connect用于连接UI组件与redux
// import { connect } from "react-redux";
import { useDispatch } from "react-redux";
// 引入操作对象
import { loginAction } from "../../../redux/actions/user";

export default function AccountForm() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { username, password } = values;
    dispatch(loginAction(username, password));
  };
  // 对密码进行自定义验证
  const validatePwd = (rule, value, callback) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject("密码必须输入"); //验证失败并指定提示的文本
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        reject("密码不能有除了数字，字母和下划线以外的");
      } else if (value.length < 3) {
        reject("密码的长度必须大于等于3");
      } else if (value.length > 20) {
        reject("密码的长度必须小于20");
      } else {
        resolve("输入正确");
      }
    });
  };
  return (
    <div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          // 这里写验证规则 声明式验证
          rules={[
            {
              required: true,
              message: `请输入你的账号`,
            },
            {
              min: 3,
              message: "用户名至少3位",
            },
            {
              max: 12,
              message: "用户名最多12位",
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "用户名必须是英文、数字或下划线组成",
            },
          ]}
        >
          {/* prefix 是一个图标 */}
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入你的账号(yxj)"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "请输入你的密码",
            },
            {
              validator: validatePwd,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入你的密码(yxj)"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            立即登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// 使用connect 创建并暴露UI 组件库 这个是组件的写法
//第一个参数必须是函数
// export default connect(
//   // mapStateToProps
//   (state) => {
//     return {
//       userRedux: state.user, //属于setHeadTitle组件的state
//     };
//   },
//   // mapDispatchToProps的简写 高速行驶 自动分发
//   // 对象的简写形式
//   {
//     loginAction,
//   }
// )(AccountForm);
