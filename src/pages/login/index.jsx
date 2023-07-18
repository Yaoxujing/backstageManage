import React, {useState} from 'react'
// 路由管理
import { Navigate} from 'react-router-dom'

// 引入antd
import { Tabs} from 'antd';

import AccountForm from './accountForm';
import PhotoForm from './photoForm';

// import { reqLogin } from '../../api'; 
// import { message } from "antd";

import './index.less'
import logo from '../../assets/images/logo.png'

// 引入connect用于连接UI组件与redux
// import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

// 引入图标
import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';

export default function Login() {
  // let navigate = useNavigate()
  // 定义是账号密码登陆还是手机号 登陆
  let [loginType, setLoginType] = useState("account")

  // 判断用户是否登陆
  const myUser = useSelector((state) => state['user'])
  // console.log(myUser)
  if (myUser && myUser._id) {
    return <Navigate to='/admin/home' />
  }

  const setType = (key) => {
    // console.log(key)
    setLoginType(key)
  };
  
    return (
      
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt='logo'/>
          <h1><span className='title'>妖精的国度</span>商品管理系统</h1>
        </header>
        
        <section className='login-content'>
          <h2>登陆界面</h2>
          <div className='login-outform'>
          <Tabs
            // activeKey={}
            onChange={setType}
            size = 'middle'
            centered
            items={[
              {
                key: 'account',
                label:  '账户密码登录',
              },
              {
                key: 'mobile',
                label: '手机号登录',
                
              }
            ]}
          />
            {loginType==='account'? <AccountForm />:<PhotoForm/>}
            <div className='login-other'>其他登陆方式:
              <AlipayCircleOutlined key="AlipayCircleOutlined" className="CircleOutlined"/>
              <TaobaoCircleOutlined key="TaobaoCircleOutlined" className="CircleOutlined"/>
              <WeiboCircleOutlined key="WeiboCircleOutlined"  className="CircleOutlined"/>
            </div>
          </div>

        </section>

      </div>
    )
  }

// 使用connect 创建并暴露UI 组件库
//第一个参数必须是函数
// export default connect(
//   // mapStateToProps
//   state => {
//     return {
//       userRedux: state.user,  //属于setHeadTitle组件的state
//     }
//     },
//     // mapDispatchToProps的简写 高速行驶 自动分发
//     // 对象的简写形式
//     {
//       loginAction
// 	}
// )(Login)