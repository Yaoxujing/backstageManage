import React, { useState, useEffect } from 'react'
// antd的组件和图标
import { Card, Button,Modal,Space, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { message } from "antd"; // 优化的界面提示

// 引入自己的组件
import './index.less' //样式
import ButtonLink from '../../components/button-link';
import { reqCategory, reqAddCategory, reqUpdateCategory } from '../../api'; //ajax 请求
import AddForm from '../../components/add-form';   //添加一个列表的组件
import UpdateForm from '../../components/update-form';   //修改一个列表的组件

// antd的解构赋值
const { Column } = Table;


export default function Category() {
  //************ 获取state ***************************
  const cardButton = useState('添加')
  // load 转圈的设计
  const [loading, setLoading] = useState(false)

  // 获取一级分类列表  list 
  const [categoryData, setCategoryData] = useState([])
  // 获取二级 分类列表list
  const [subCategoryData, setSubCategoryData] = useState([])
  // 当前分类对象
  const [category, setCategory] = useState({})
  
  // 获取添加/更新后的列表
  const [addFormRef, setAddFormRef] = useState(null);
  const [updateFormRef,setUpdateFormRef] = useState(null);

  // 当前需要显示的分类列表parentId
  const [parentId, setParentId] = useState('0')
  const [parentName, setParentName] = useState('一级分类列表')

  // modal组件
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);

  //************************************************************

  //**********************ajax 函数***************************
  // ajax 获取一级或者二级属性
  async function fetchCategory() {
    setLoading(true)
    const result = await reqCategory(parentId);
    if (result.data.status === 0) {
      let catoData = result.data.data
      if (parentId === '0') {
        // 更新一级属性
        setCategoryData(catoData);
      } else {
        // 更新二级属性
        setSubCategoryData(catoData)
      }
      setLoading(false)
    }
  }

  // ajax 添加列表
  async function AddCategory(categoryId, categoryName) {
    // console.log(categoryId,categoryName)
    const result = await reqAddCategory(categoryId, categoryName);
    if (result.data.status === 0) {
      message.success("添加成功")
    }
  }

  // ajax 更新列表
  async function UpdateCategory(categoryId, categoryName) {
    const result = await reqUpdateCategory(categoryId, categoryName);
    if (result.data.status === 0) {
      message.success("修改成功")
    }
  }
  //********************传给子组件的函数 用于接收参数************************

  // 接收到 add-from传递的参数
  const handleAddFormRef = (form) => {
    setAddFormRef(form);
  };

  // 按修改的确定 接收子传给父亲的参数
  const handleUpdateFormRef = (form) => {
    setUpdateFormRef(form)
  }

  //*********************点击事件回调函数************************
  // 点击修改 显示确认框并传递参数
  const UpdateFunction = (record) => {
    setModal2Open(true)
    // 保存分类对象
    setCategory(record)
  }

   //点击子分类 显示子分类
  function showSubCategorys(category) {
    // console.log(category._id)
    setParentId(category._id)
    setParentName(category.name)
  }

  // 点击返回 恢复成一级目录
  function changeParentId() {
    setParentId('0')
    setParentName('一级分类列表')
  }

  // 点击 Modal按钮确定  添加一个数据
  function AddOkModal() {
    // 1、隐藏确定框
    setModal1Open(false)
    // 2、准备数据 categoryId 和 categoryName
    const categoryId = addFormRef.current.getFieldValue('categoryId');
    const categoryName = addFormRef.current.getFieldValue('categoryName');
    // console.log("AddFunctionModal",categoryId, categoryName);
    // 清除输入的数据
    addFormRef.current.resetFields()

    // 3、发送请求更新分类
    AddCategory(categoryId,categoryName)
    // 3、重新显示列表 这里可以优化 但是我懒
    // if (categoryId === parentId) {
    //   fetchCategory()
    // } else {
    //   if (categoryId === '0') {
    //     fetchCategory(categoryId)
    //   }
    // }
    fetchCategory()
    
  }

  // 点击 Modal按钮确定  修改一个数据
  function UpdateOkModal() {
    // 1、隐藏确认框
    setModal2Open(false)
    // 2、准备数据
    const categoryId = category._id
    const categoryName = updateFormRef.current.getFieldValue('updateName');
    // 清空数据
    updateFormRef.current.resetFields()
    UpdateCategory(categoryId, categoryName)
    // 3、重新显示列表
    fetchCategory()
  }

  //************************钩子******************************/
  // 当parentId更新的时候执行
  useEffect(() => {
    fetchCategory();
  }, [parentId]);

  // 执行异步任务 更新状态
  useEffect(() => {
    fetchCategory();
  }, []);

  /***********************************************************/


  return (
    // <div className='category'>
      <Card
      title= {parentName}
        extra={
          <div>
            {(subCategoryData.length === 0 && parentId !=='0')  ? <Button className='category-back' onClick={changeParentId}>返回</Button> : null}
            
            <Button type="primary" onClick={() => setModal1Open(true)}>
              <PlusOutlined />
              {cardButton}
            </Button>
            <Modal
              okText= '确认'
              cancelText= '取消'
              title="增加分类"
              style={{ top: 20 }}
              open={modal1Open}
              onOk={() =>   AddOkModal()}
              onCancel={() => setModal1Open(false)}
              >
                <AddForm categories={categoryData} addForm={handleAddFormRef} parentId={parentId}/>
              </Modal>
          </div>
        }
        style={{
          margin: 20,
          textAlign: 'left'
        }}
    >
        <Table
          rowKey='_id'
          dataSource={parentId==='0' ? categoryData : subCategoryData}
          bordered
          loading={loading}
          pagination={{ defaultPageSize: 5 }}
        >
          <Column title="分类的名称" dataIndex="name" key="_id" width={550}/>
          
          <Column
            title="操作"
            key="action"
                  
            render={(_, record) => (
              <Space size="middle">
                <ButtonLink onClick={() => UpdateFunction(record)}>修改分类</ButtonLink>
                <Modal
                  okText= '确认'
                  cancelText= '取消'
                  title="修改分类"
                  centered
                  open={modal2Open}
                  onOk={() => UpdateOkModal()}
                  onCancel={() => setModal2Open(false)}
                  >
                    <UpdateForm category={category} updateForm={handleUpdateFormRef} parentId={parentId}/>
                </Modal>
                {parentId ==='0' ? <ButtonLink onClick={() => {showSubCategorys(record) }}>查看子分类</ButtonLink> :<ButtonLink onClick={changeParentId}>返回</ButtonLink>}
                
              </Space>
            )}
    />
  </Table>
    </Card>
    // </div>
  )
}
