import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate,useLocation  } from 'react-router-dom'
import storageUtils from '../../utils/storageUtils';

// antd 
import { Menu } from 'antd';


// 引入自身组件
import './index.less'
// logo图片
import logo from '../../assets/images/logo.png'
// 路由list
import Items from '../../config/menuConfig';

//redux
import {useDispatch, useSelector } from 'react-redux';
import { setHeadTitle } from '../../redux/actions/headTitle';


// 映射一个keyToLabel
const keyToLabel = new Map()
Items.map((index) => {
  if (index.children) {
    index.children.map(child => {
      keyToLabel.set(child.key, child.label)
      return child
      } 
    )
  } else {
    keyToLabel.set(index.key, index.label)
  }
  return index
})

// 左侧导航的文件
export default function LeftNav() {
  const dispatch = useDispatch()
  const location = useLocation();
  // 设置折叠的状态 警告之后写在了外面
  // const [collapsed,setCollapsed] = useState(false);
  // const [collapsed] = useState(false);
  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  // 根据权限指定管理界面
  const [myItems, setMyItems] = useState([])
  const user = useSelector((redux)=>redux.user)

  // 刷新的时候保持选中状态
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    updateMenu();
    // 从本地存储中获取选中的菜单项的键值
    const storedKey = storageUtils.getKey();
  
    if (storedKey && storedKey === location.pathname) {
      setSelectedKey(storedKey);
    } else {
      setSelectedKey(location.pathname)
    }
    dispatch(setHeadTitle(keyToLabel.get(storedKey)))
    
  }, [])

  
  // 根据用户权限更新 Menu
  const updateMenu = () => {
    let { menus } = user.role
    // 深度拷贝
    let initItems = deepClone(Items)
    //疯狂bug
    // 如果用filter我只能做到这了 child filter不了
    let myItem = initItems.filter((item) => {
      if (item.children) {
        const key = item.children.filter((child) => {
          // 如果孩子都没了 就删除
          return menus.includes(child.key)
        })
        return key.length !== 0
      } else {
        // 没有就删除
        return menus.includes(item.key)
      } 
    })
    // 然后再过滤一遍 把孩子删了
    myItem = myItem.map((item) => {
      if (item.children) {
        const child = item.children.filter((child) => {
          return menus.includes(child.key)
        })
        // 问题还是在这 不能这么改哈哈哈 children 的这个数组是一个地址 啊 气死
        item.children = child
      }
      return item
    })
    setMyItems(myItem)
  }

  // 深度拷贝 使用递归来复制对象
  function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    let clone = Array.isArray(obj) ? [] : {};
    
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key]);
      }
    }
    
    return clone;
  }

  // 路由跳转
  const navigate = useNavigate()

  // 跳转函数
  const routerTo = (e) => {
    // console.log(e.item.props.label)
    setSelectedKey(e.key);
    // console.log(e.key)
    dispatch(setHeadTitle(keyToLabel.get(e.key)))
    // 将选中的菜单项的键值保存到本地存储
    storageUtils.saveKey(e.key);
    navigate(e.key,{replace:true})
  }

  return (
    <div className='left-nav'>
      {/*导航栏的头部 */}
      <Link to='/admin' >
        <header className='left-nav-header'>
          <img src={logo} alt='logo'></img>
          <h1>商城后台</h1>
        </header>
      </Link>
      {/* memu 导航菜单 */}
      <div
      style={{
        width: 200,
      }}
      >
        <Menu
          // 默认选中
          defaultSelectedKeys={['/admin/home']}
          // 默认展开
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          // inlineCollapsed={collapsed} 写在 slider外面了
          // 这个item 写在 menulist 里面
          // 不需要递归调用了就，所以只能修改items了吗 救命好难
          items = {myItems}
          // 点击跳转链接
          onClick={routerTo}
          selectedKeys={[selectedKey]}
          />
      </div>
    </div>
  )
}
