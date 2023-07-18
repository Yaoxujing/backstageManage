import React from 'react'
import { useState } from 'react';

// 引入antd
import { Layout} from 'antd'

// import memoryUtils from '../../utils/memoryUtils'
// import storageUtils from '../../utils/storageUtils'

// 引入路由
import { Navigate,Outlet } from "react-router-dom";
// 引入所有的子路由
import HeaderMy from '../../components/header-my'
import LeftNav from '../../components/left-nav'


// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'
// 引入操作对象
import { loginAction } from '../../redux/actions/user';

// 解构赋值
const { Header, Footer, Sider, Content } = Layout




function Admin(props) {
  // 接收到的状态
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  // 如果本地存储中没有储存user ==>当前没有登陆需要回退
  // const user = storageUtils.getUser()
  const user = props.useRedux
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
          <Footer style={footerStyle}>出品单位：杭州电子科技大学  &ensp; 出品人：yxj &ensp; 学院：计算机学院 &ensp;  时间：2023年 &ensp; email:387951031@qq.com</Footer>
        </Layout>
      </Layout>
  )
}

export default connect(
  // mapStateToProps
  state => {
    return {
      useRedux: state.user,  //属于setHeadTitle组件的state
    }
    },
    // mapDispatchToProps的简写 高速行驶 自动分发
    // 对象的简写形式
    {
      loginAction
	}
)(Admin)

