import React from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useState,useEffect ,useRef} from 'react'
import { Card, Button, Table, Modal } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { formateDate } from '../../utils/dateUtils'
import ButtonLinkWrapper from '../../components/button-link'
import { reqUsers , reqDeleteUsers,reqAddUser,reqUpdateUser} from '../../api'
import AddUser from './add-user'
import { message } from 'antd'

export default function User() {
  // *****************初始化数据*************************
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])
  const [ roles, setRoles] = useState([])
  const [ roleNames, setRoleNames] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [userRef, setUserRef] = useState([])
  const [update, setUpdate] = useState(false)

  // ****************一些函数****************************
  // 1、点击按钮函数
  // modal的确定
  const AddUserModal = () => {
    setModalOpen(false)
    addOrUpdateUser()
  }
  // confirm的确定
  const { confirm } = Modal;
  const showConfirm = (user) => {
    confirm({
      okText: '确认',
      cancelText: '取消',
      title: `你确定要删除${user.username}用户吗?`,
      icon: <ExclamationCircleFilled />,
      content: '点击了这个用户就被您删除了',
      onOk() {
        // console.log('OK');
        deleteUser(user)
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  // 2、发送请求的函数
  // 获取用户和角色
  const getUser = async () => {
    const result = await reqUsers()
    setLoading(true)
    if (result.data.status === 0) {
      // message.success("获取成功")
      let myUsers = result.data.data;
      // console.log("!", myUsers.users)
      initRoleNames(myUsers.roles)
      setUsers(myUsers.users)
      setRoles(myUsers.roles)
    } else {
      message.error()
    }
    setLoading(false)
  }

  // 删除用户
  const deleteUser = async (user) => {  
    const userId = user._id
    const result = await reqDeleteUsers(userId)
    setLoading(true)
    if (result.data.status === 0) {
      message.success("删除成功")
      getUser()
    } else {
      message.error("啊哦没删掉呢")
    }
    setLoading(false)
  }

  // 更新或者添加用户
  const addOrUpdateUser = async() => {
    //1、收集输入数据
    let user = userRef.current.getFieldValue()
    // console.log(user)
    // 2、提交添加请求
    let result 

    if (update) {
      // 如果是更新用户
      result = await(reqUpdateUser(user))
    } else {
      // 如果是添加用户
      result = await (reqAddUser(user))
    }
    
    userRef.current.resetFields()
    if (result.data.status === 0) {
      let show = update ? "更新用户成功": "添加用户成功"
      message.success(show)
      // console.log(result.data.data)
    } else {
      message.error("失败了")
    }
    // 3、更新列表显示
    getUser()
  }


  //3、其他的函数
  //获取 id 与 role 的对应关系
  const initRoleNames = (roles) => {
    //获取 id 与 role 的对应关系 其实就是一个map
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    // 保存
    setRoleNames(roleNames)
  }

  // 保存子组件的ref
  const addForm = (userRef) => {
    setUserRef(userRef)
  }

  //*****************钩子************************* */
  // 执行异步任务 更新状态
  useEffect(() => {
    getUser();
  }, []);

  //*****************表格属性*******************
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      render: formateDate
    },
    {
      title: '所属角色',
      dataIndex: 'role_id',
      // 第一种写法 要一直遍历
      // render:(role_id)=> roles.find(role => role._id === role_id).name
      // 第二种写法直接查询
      render:(role_id) => roleNames[role_id]
    },
    {
      title: '操作',
      render: (user) => (
        <span>
          {/* hello */}
          <ButtonLinkWrapper onClick={() => { setUpdate(true); setModalOpen(true); setUser(user); console.log(user)}}>修改</ButtonLinkWrapper>
          <ButtonLinkWrapper onClick={()=>{showConfirm(user)}}>删除</ButtonLinkWrapper>  
        </span>
      ),
    }

  ]
  const title = (
    <Button type='primary' onClick={() => {setUpdate(false);setModalOpen(true)}} >创建用户</Button>
  )

  return (
    <Card
      title={title}
      style={{
        margin: 20,
        textAlign: 'left'
      }}
      
    >
      <Table
        loading={loading}
        rowKey='_id'
        columns={columns}
        dataSource={users}
        pagination={{defaultPageSize: PAGE_SIZE}}
        // onChange={(pageNumber) => { setPageNum(pageNumber.current)}}

      />
      <Modal
        okText='确认'
        cancelText='取消'
        title={update? "修改用户" : "添加用户"}
            centered
            open={modalOpen}
            onOk={() => AddUserModal()}
        onCancel={() => { setModalOpen(false); userRef.current.resetFields()}}
            >
        <AddUser roles={roles} update={update} addForm={addForm} user={user} />
      </Modal>
    </Card>
  )
}
