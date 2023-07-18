import React from 'react'
// 状态函数和钩子函数
import { useState, useEffect } from 'react';

// 路由信息
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// antd 组件库
import {ExclamationCircleFilled } from "@ant-design/icons";
import { Modal ,message} from 'antd';

// 引入自己的组件
import './index.less'
// 天气请求
import { reqWeather } from '../../api'
// 列表函数
import menuList from '../../config/menuConfig';
// 格式化日期
import { formateDate } from '../../utils/dateUtils';
// localstorage 缓存存储
// import storageUtils from '../../utils/storageUtils';

// 引入connect用于连接UI组件与redux
// import { connect } from 'react-redux'
import {useDispatch, useSelector} from 'react-redux'
// 引入操作对象
import { loginOut } from '../../redux/actions/user';

import { Avatar, Badge} from 'antd';

import {BellOutlined , SmileOutlined ,MailOutlined,NotificationOutlined,UserOutlined} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const { confirm } = Modal;

// 函数组件
export default function HeaderMy() {
  const dispatch = useDispatch()
  // `state` 的状态是通过使用 `useState` 钩子来管理的。我们使用 `useState` 定义了 `currentTime`、`weather` 和 `city` 这三个状态。
  const [currentTime, setCurrentTime] = useState(formateDate(Date.now()));
  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const [imageUrl] = useState("https://yxj-image.oss-cn-hangzhou.aliyuncs.com/image/");

  // 下拉组件
  const items = [
    {
      key: '1',
      label: (
        <div>
          <p target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            From:小张 --这个项目需要测试一下
          </p>
        </div>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          From:小李 --李总明天晚上8点要求开会
        </a>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          From:闺蜜 --今天晚上咱们去吃啥？
        </a>
        
      ),
      icon: <SmileOutlined />,
    },
    {
      key: '4',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          From:上司 --给你的项目怎么样了？明天汇报一下
        </a>
        
      ),
      icon: <SmileOutlined />,
    },
    {
      key: '5',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          From:露丝 --Thank you for your help
        </a>
        
      ),
      icon: <SmileOutlined />,
    }
    
  ];

  //
  const { headTitle, user } = useSelector((state)=>state) 
  // 使用函数
  const location = useLocation();
  const navigate = useNavigate()

  // useEffect ： componentDidMount 和 componentWillUnmount 的生命周期方法 替代版本
  // 请求更新时间 定时器的启动和消除
  useEffect(() => {
    // 这里自己调用了自己
    const intervalId = setInterval(() => {
      setCurrentTime(formateDate(Date.now()));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  
  // 请求调用天气接口
  useEffect(() => {
    // reqWeather 是个 promise 可以用 async await 接收
    async function fetchWeather() {
      const response = await reqWeather();   
      // 处理查询失败和成功
      const result = response.data;
      if (result.status === '1') {
        // 保存状态 不知道为啥这里有个数组
        const { city, weather } = result.lives[0];
        // 更新state
        setWeather(weather);
        setCity(city);
      } else {
        // console.log("wrong", result.msg);
        message.error(result.msg)
      }
    }
      fetchWeather();
  }, []);
  
  //获取标题 递归的方法
  // function getTitleD() {
  //   let title = "首页"
  //   const path = location.pathname;
  //   const findTitle=(items)=>{
  //     if (!items) {
  //       return
  //     }
  //     items.forEach((item) => {
  //       if (new RegExp(item.key).test(path)) {
  //         title = item.label;
  //         return title
  //       }
  //       findTitle(item.children)
  //     })
  //   }
  //   findTitle(menuList)
  //   return title;
  // }

  // 通过标题的redux读取


  //退出的按钮 antd confirm
  const showConfirm = () => {
    confirm({
      okText: '确认',
      cancelText: '取消',
      title: '你确定要退出登录吗?',
      icon: <ExclamationCircleFilled />,
      content: '该操作会退出当前用户的登录状态，你可以重新登录切换状态哦(⊙o⊙)？',
      onOk() {
        // 删除保存的user数据
        // storageUtils.removeUser()
        dispatch(loginOut())
        // 跳转到登录界面
        navigate('/login',{replace:true})

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  

  return (
    <div className='header-my'>
      <div className='header-top'>

      {/* 消息组件 */}
      
      <Dropdown
        menu={{
          items,
          }}
        className='header-message'
      >
      <a onClick={(e) => e.preventDefault()}>
            <Space className='header-space'>
            <Badge count={5}>
              <Avatar shape="square" icon={<MailOutlined />} />
            </Badge>
        </Space>
          </a>
      </Dropdown>
      <Dropdown
        menu={{
          items,
          }}
          className='header-note'
      >
      <a onClick={(e) => e.preventDefault()}>
            <Space className='header-space'>
            <Badge count={1}>
              <Avatar shape="square" icon={<BellOutlined />} />
            </Badge>
          {/* <BellOutlined style={{fontSize: '16px'}}/> */}
        </Space>
          </a>
        </Dropdown>
        <Dropdown
        menu={{
          items,
          }}
          className='header-task'
      >
      <a onClick={(e) => e.preventDefault()}>
        <Space className='header-space'>
            <Badge count={5}>
              <Avatar shape="square" icon={<NotificationOutlined />} />
            </Badge>
        </Space>
          </a>
        </Dropdown>
        <span className='header-hello'>欢迎，<Avatar
      style={{
            backgroundColor: '#1100fb',
        marginRight:10
      }}icon={<UserOutlined />}
    />{user.username}
        </span>
        
      
        <button type="text" onClick={showConfirm} className='top-button'>退出</button>
        {/* <a href='#' onClick={showConfirm}> 退出</a> */}

        
      </div>
      <div className='header-bottom'>
        <div className='header-bottom-left'>{headTitle}</div>
        <div className='header-bottom-right'>
          <span>{currentTime}</span>
          <span>{city}</span>
          <img src={weather === '晴'? `${imageUrl}image-20230505145344152.png`: `${imageUrl}image-20230505174331927.png`}  alt="weather" />
          <span>{weather}</span>
        </div>
      </div>
    </div>
  )
}


// 使用connect 创建并暴露UI 组件库
//第一个参数必须是函数
// export default connect(
//   // mapStateToProps
//   state => {
//     return {
//       headTitle: state.headTitle,  //属于setHeadTitle组件的state
//       user : state.user
//     }
//     },
//     // mapDispatchToProps的简写 高速行驶 自动分发
//     // 对象的简写形式
//     {
//       loginOut
// 	}
// )(HeaderMy)
