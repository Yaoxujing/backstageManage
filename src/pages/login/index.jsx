import React from 'react'

// 路由管理
import { useNavigate ,Navigate} from 'react-router-dom'

// 引入antd
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { reqLogin } from '../../api'; 
import { message } from "antd";

import './index.less'
import logo from '../../assets/images/logo.png'
import storageUtils from '../../utils/storageUtils';
// import memoryUtils from '../../utils/memoryUtils';

export default function Login() {
  let navigate = useNavigate()

  // 判断用户是否登陆
  const myuser = storageUtils.getUser()
  console.log(myuser)
  if (myuser && myuser._id) {
    return <Navigate to='/admin' />
  }
  
    
      const onFinish = async(values)=>{
        const { username, password } = values
        // then的方法
        // reqLogin(username,password).then(response=>{
        //     console.log('请求成功',response.data)
        // }).catch(err=>{
        //     console.log('失败',err)
        // })
        // console.log(username,password)
  
        const response = await reqLogin(username, password)
      
        // 处理登录失败和成功
        const result = response.data
        if (result.status === 0) {
            // console.log("登陆成功")
            message.success('登录成功！')
            // 保存登录状态
            const user = result.data
            // memoryUtils.user =user     //保存在内存中
            storageUtils.saveUser(user) //保存到local中去
              // 路由跳转
          navigate('/', { replace: true })
          // this.props.history.replace('/') 
          }
        else {
          // console.log(result.msg)
            message.error(result.msg)
          }
      }
    // 对密码进行自定义验证
    const validatePwd = (rule, value, callback) => {
      return new Promise((resolve, reject) => {
          if (!value) {
            reject("密码必须输入") //验证失败并指定提示的文本
          }else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            reject("密码不能有除了数字，字母和下划线以外的")
          } else if (value.length < 3) {
            reject("密码的长度必须大于等于3")
          } else if (value.length > 20) {
            reject("密码的长度必须小于20")
          } else {
            resolve('输入正确')
          }
        })   
    }
  
    return (
      
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt='logo'/>
          <h1>React项目:欢迎来到婧婧的后台</h1>
        </header>
        <section className='login-content'>
          <h2>用户登陆</h2>
          <div className='login-outform'>
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
                    message: '请输入你的账号',
                  }, 
                  {
                    min:3,
                    message:'用户名至少3位',
                  }, {
                    max: 12,
                    message:'用户名最多12位'
                  }, {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message:'用户名必须是英文、数字或下划线组成'
                  }
                  
                ]}
              >
                {/* prefix 是一个图标 */}
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入你的账号" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入你的密码',
                  }, {
                    validator: validatePwd
                  }
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="请输入你的密码"
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
                <Button type="primary" htmlType="submit" className="login-form-button">
                  立即登陆
                </Button>
                Or <a className='login-form-log' href="">注册</a>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    )
  }

