import React from 'react'
import { useState } from 'react';

// 引入antd
import { Layout} from 'antd'

// import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

// 引入路由
import { Navigate,Outlet } from "react-router-dom";
// 引入所有的子路由
import HeaderMy from '../../components/header-my'
import LeftNav from '../../components/left-nav'

// 解构赋值
const { Header, Footer, Sider, Content } = Layout



export default function Admin() {
  // 接收到的状态
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // 如果本地存储中没有储存user ==>当前没有登陆需要回退
  const user = storageUtils.getUser()

  if (!user || !user._id) {
    return <Navigate to='/login' />
  }
  
  // 这里是自带的,设置了一些style 
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 80,
    lineHeight: '80px',
    backgroundColor: '#74b9ff'
     
  };
  const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    backgroundColor: '#182C61'
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#3d3d3d',
    backgroundColor: '#dfe4ea'
  };

  return (
      <Layout style={{
      minHeight: '100%',
    }}>
        <Sider style={siderStyle} >
          <LeftNav onCollapse={toggleCollapsed} collapsed={collapsed} />
        </Sider>
        <Layout>
          {/* 头部组件 */}
          <Header style={headerStyle}>
            <HeaderMy />
          </Header>
          {/* 内容组件 */}
          <Content style={contentStyle}>
            {/* 路由插槽 */}
            <Outlet />
          </Content>
          {/* 尾部组件 */}
          <Footer style={footerStyle}>做出这个界面不易啊,看到的快夸夸我吧,欢迎提出指导意见,大家一起来找bug</Footer>
        </Layout>
      </Layout>
  )
}

