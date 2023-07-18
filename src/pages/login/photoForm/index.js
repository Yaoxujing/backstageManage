import React, { useState, useRef, useEffect } from "react";
// 引入antd
import { MessageOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Tabs } from "antd";

import "./index.less";
import ButtonLink from "../../../components/button-link";
export default function PhotoForm() {
  // 表示剩余时间
  const [timeLeft, setTimeLeft] = useState(0);
  // 3. 发送验证码功能
  //   const mobileRef = useRef(null);
  // 2. 按钮禁用状态
  const [form] = Form.useForm();
  // 获取最近的timer
  const timer = useRef(0);

  // 点击发送验证码
  const getCode = async () => {
    const mobile = form.getFieldValue("mobile");
    const isPhone = form.getFieldError("mobile");
    if (!mobile || isPhone.length > 0) {
      console.log("校验失败", mobile);
    } else {
      // 提示可有可无
      message.success("发送成功");

      setTimeLeft(60);
      // 获取最新的状态 需要用箭头函数
      timer.current = window.setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    }
  };

  // 清除定时器
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timer.current);
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const onFinish = async (values) => {
    message.warning("暂不支持手机登陆");
    // props.loginAction(mobile, code);
  };

  return (
    <div>
      {" "}
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        {/* 手机号 */}
        <Form.Item
          name="mobile"
          // 这里写验证规则 声明式验证
          rules={[
            {
              required: true,
              message: `请输入你的手机号`,
            },
            {
              pattern: /^[0-9]{11}$/,
              message: "请输入正确的手机号",
            },
          ]}
        >
          {/* prefix 是一个图标 */}
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="请输入你的手机号"
          />
        </Form.Item>
        <Form.Item
          name="code"
          //   卡了点bug
          rules={[{ len: 6, message: "验证码长度为6位" }]}
          extra={
            <ButtonLink
              onClick={timeLeft === 0 ? getCode : undefined}
              className="code-extra"
            >
              {timeLeft === 0 ? "发送验证码" : `还需${timeLeft}秒后重新发送`}
            </ButtonLink>
          }
        >
          <Input
            prefix={<MessageOutlined className="site-form-item-icon" />}
            placeholder="请输入验证码"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            立即登陆
          </Button>
          {/* Or{" "}
    <a className="login-form-log" href="">
      注册
    </a> */}
        </Form.Item>
      </Form>
    </div>
  );
}
