import React from 'react'
import { useState, useEffect } from 'react';
import { Card,Button,Table } from 'antd'
import { PAGE_SIZE } from '../../utils/constants';
import { reqRoles ,reqAddRoles ,reqUpdateRoles} from '../../api';
import { Modal } from 'antd';
// import storageUtils from '../../utils/storageUtils';
import AddForm from './add-form';
import AuthForm from './auth-form';
import { message } from "antd"; // 优化的界面提示
import { formateDate } from '../../utils/dateUtils';

// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

function Role(props) {
  // 获取modal1/2开闭的
  const [modal1Open, setModal1Open] = useState(false)
  const [modal2Open, setModal2Open] = useState(false)
  // 控制loading的
  const [loading, setLoading] = useState(false);

   // 获取添加/更新后的表单
  const [addFormRef, setAddFormRef] = useState(null);
  // 这个直接子给父传了数据
  const [authForm, setAuthForm] = useState(null);

  // 表示所有的角色
  const [roles, setRoles] = useState([])
  // 表示选中的角色
  const [role, setRole] = useState({})


  // *****************Table********************
  // 获取行号
  const onRow = (role) => {
    // console.log(role)
    return {
      onClick: event => {
        setRole(role)
      }
    }
  }
  
  // 表格 的列
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render: formateDate
    },
    {
      title: '授权时间',
      dataIndex: 'auth_time',
      render: formateDate
    },{
      title: '授权人',
      dataIndex: 'auth_name',
      render: (text) => text,
    }
  ]

  //******************钩子*********************/
  // 执行异步任务 更新状态
  useEffect(() => {
    getRoles();
  }, []);


  // 获取用户信息
  const getRoles = async () => {
    setLoading(true)
    const result = await reqRoles()
    if (result.data.status === 0) {
      // console.log("roles", result.data.data)
      const roles = result.data.data
      setRoles(roles)
      getRoles();
    }
    setLoading(false)
  }

  // 接收到 add-from传递的参数
  const handleAddFormRef = (form) => {
    setAddFormRef(form);
  };

  // 接收到 auth-from传递的参数
  const handleAuthForm = (form) => {
    setAuthForm(form);
  };


  // model的修改按钮
  const AddRoleModal = () => {
    // 1、隐藏确定框
    setModal1Open(false)
    // 2、准备数据 role
    const role = addFormRef.current.getFieldValue('role');

    // console.log("AddFunctionModal",categoryId, categoryName);
    // 清除输入的数据
    // 3、发送添加角色请求
    // AddCategory(categoryId, categoryName)
    AddRole(role)
    // fetchCategory()
  }

  // model的添加权限按钮
  const AuthRoleModal = () => {
    // 1、隐藏确定框
    setModal2Open(false)
    // 2、准备数据 menus
    const menus = authForm
    // console.log("menus", menus) //['/home', '/category', '/product', '/user']
    // 更新参数
    role.menus = menus
    setRole(role)
    // console.log(role)

    AuthRole(menus)

  }

  // 请求添加角色参数
  const AddRole = async (roleName) => {
    setLoading(true)
    const result = await reqAddRoles(roleName)
    // console.log(result.data)
    if (result.data.status === 0) {
      message.success("添加成功")
      
      // 更新状态
      const myRoles = [...roles]
      myRoles.push(roleName)
      setRoles(myRoles)
    } else {
      message.error("添加失败")
    }
    setLoading(false)
  }

  // 请求添加权限按钮
  const AuthRole = async () => {
    // 这里权限的真不知道怎么写
    setLoading(true)
    //设置角色
    const { _id ,menus} = role //权限key数组
    const auth_time = Date.now() //授权时间

    // const auth_name = storageUtils.getUser().username //授权用户->当前登录用户
    const auth_name = props.user.username
    const newRole = { _id, menus, auth_name, auth_time }
    // console.log(newRole)

    const result = await reqUpdateRoles(newRole)
    console.log("result",result.data)
    if (result.data.status === 0) {
      message.success("添加成功")
      // 重新获取
      getRoles()
    } else {
      message.error("添加失败")
    }
    setLoading(false)
  }

  // ******************布局**************************
  const title = (
    <span>
      <Button type='primary' onClick={() => setModal1Open(true)}>创建角色</Button> &nbsp; &nbsp;
      <Modal
        okText= '确认'
        cancelText= '取消'
        title="添加角色"
        centered
        open={modal1Open}
        onOk={() => AddRoleModal()}
        onCancel={() => setModal1Open(false)}
        >
          <AddForm  addForm={handleAddFormRef} />
      </Modal>
      <Button type='primary' disabled={!role._id} onClick={() => setModal2Open(true)}>设置角色权限</Button>
      <Modal
        okText= '确认'
        cancelText= '取消'
        title="设置角色权限"
        centered
        open={modal2Open}
        onOk={() => AuthRoleModal()}
        onCancel={() => setModal2Open(false)}
        >
        <AuthForm authForm={handleAuthForm} role={role} />
      </Modal>
    </span>
  )

  return (
    <Card title={title}
      style={{
      margin: 20,
      textAlign: 'left'
      }}>
      <Table
        loading={loading}
        rowKey='_id'
        columns={columns}
        dataSource={roles}
        pagination={{defaultPageSize: PAGE_SIZE}}
        // onChange={(pageNumber) => { setPageNum(pageNumber.current)}}
        rowSelection={{
          type: "radio",
          selectedRowKeys: [role._id],
          onSelect: (role) => {
            setRole(role)
          }
        }}
        
        onRow={onRow}
          />

    </Card>
  )
}

export default connect(
  // mapStateToProps
  state => {
    return {
      user: state.user,  //属于setHeadTitle组件的state
    }
    },
    // mapDispatchToProps的简写 高速行驶 自动分发
    // 对象的简写形式
    {
      
	}
)(Role)