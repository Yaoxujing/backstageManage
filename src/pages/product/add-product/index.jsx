import React, { useEffect ,useRef} from 'react'
import { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import { reqAddOrUpdateProduct } from '../../../api';
import {
  Card,
  Form,
  Input,
  Cascader,
  Button
} from 'antd'
import { message } from 'antd';

import './index.less'
import ButtonLink from '../../../components/button-link';
import { reqCategory } from '../../../api';
import PictureWalls from './picture-wall';
import RichTextEditor from './rich-text-aditer';


const { TextArea } = Input;

export default function AddUpdateProduct() {
  let navigate = useNavigate()
  const location = useLocation()

  // 动态获取级联选项
  const [options, setOptions] = useState([]);
  // console.log(location)
  // 判断路由是否需要上传数据
  const {update } = location.state
  const { products } = location.state || {}
  let imgs = update ? products.imgs : ''
  let pictureWallsRef = useRef() //接收图片的ref
  let richTextEditorRef = useRef()
  // const imgs = pictureWallsRef.current.getImgs()
  // console.log("pictureWallsRef", pictureWallsRef.current.test())
  // console.log("products",products)

  // 用来接收级联分类的默认数组
  const categoryIds = []
  
  if (update) {
    const {pCategoryId,categoryId} = products
    // 商品是一个一级列表
    if (pCategoryId === '0') {
      categoryIds.push(categoryId)
    } else {
      // 商品是一个二级列表
      categoryIds.push(pCategoryId)
      categoryIds.push(categoryId)
    }  
  }

  // 设置表单默认值
  let initialValues
  if(update){
    initialValues = {
      name: products.name,
      desc: products.desc,
      price: products.price,
      // imgs: products.imgs,
      detail: products.detail,
      class: categoryIds
      
    }
    // console.log(initialValues.class)
  } else {
    initialValues ={}
  }

  // ---------------点击函数----------------------
  // 表单成功或者失败
  const onFinish = async(values) => {
    // 1、收集数据并封装成product 对象
    // categoryIds
    // |参数		       |是否必选 |类型     |说明
    // |categoryId    |Y       |string   |分类ID
    // |pCategoryId   |Y       |string   |父分类ID
    // |name          |Y       |string   |商品名称
    // |desc          |N       |string   |商品描述
    // |price         |N       |string   |商品价格
    // |detail        |N       |string   |商品详情
    // |imgs          |N       |array   |商品图片名数组
    let id = values.class
    let categoryId
    let pCategoryId
    let {desc,name,price} = values
    if (id.length === 1) {
      categoryId = id[0]
      pCategoryId = '0'
    } else {
      categoryId = id[1]
      pCategoryId = id[0]
    }
    // console.log("values",values)
    // |_id           |Y       |string   |商品ID
    // console.log("categoryId",categoryId)
    // console.log("pCategoryId", pCategoryId)
    // console.log("name",name)
    // console.log("desc",desc)
    // console.log('price:', price);
    let picture  = pictureWallsRef.current.getImgs()
    console.log("picture", picture)
    let imgs = picture
    let detail = richTextEditorRef.current.getDetail()
    // console.log("detail", detail)
    
    let MyProducts = {categoryId,pCategoryId,name,desc,price,imgs,detail}

    if (update) {
      MyProducts._id = products._id
    }
    // console.log(MyProducts)
    // 2、调用接口请求函数去添加
    const response = await reqAddOrUpdateProduct(MyProducts)
    // 3、根据结果提示
    const result = response.data
    if (result.status === 0) {
      // console.log("登陆成功")
      message.success('成功！')
    }
    else {
      // console.log(result.msg)
      message.error(result.msg)
    }
    navigate(-1)

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // 这个改变的好像暂时没用到
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
    
  };


  // 包含ajax请求的函数
  // 获取一级/二级分类列表,并显示
  const getCategories = async (parentId) => {
    
    const result = await reqCategory(parentId)
    // console.log(result)
    if (result.data.status === 0) {
      // 获取当前目录下的子目录
      const categories = result.data.data
      if (parentId === 0) {
        // console.log("categories",categories)
        initOptions(categories)
      } else {
        return categories  //返回二级列表 当前async 函数返回的 promise就会成功 
      }
    }
  }

  // 这个之前初始的时候有点bug postman
  const initOptions = async(categories) => { //async是为了 await
    const newOptions = categories.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))
    // 这个就是初始值的时候直接全部加载了 
    if (update) {
      // 如果是一个为二级分类列表的更新
      const { pCategoryId} = products
      if (pCategoryId !== '0') {
        // 获取对应的二级分类的ID 
        const subCategory = await getCategories(pCategoryId)
        // 生成下拉二级列表
        const childOptions = subCategory.map(c => ({
          value: c._id,
          label: c.name,
          isLeaf: true,
        }))
        // 找到当前一级target
        const targetOption = newOptions.find(option=>option.value === pCategoryId)
        // 关联到对应的一级option上
        targetOption.children = childOptions
      }
      
    }
    // console.log(newOptions)
    setOptions(newOptions)
  }

  //动态加载 选择框
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // 请求异步发送
    // 根据选中的分类，找到下一级分类
    const subCategory = await getCategories(targetOption.value)

    // 有二级分类
    if (subCategory && subCategory.length > 0) {
      targetOption.loading = false;
      const childOptions = subCategory.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      targetOption.children = childOptions
    } else { //没有二级分类
      targetOption.isLeaf = true
    }
    setOptions([...options]);
  }

    // 钩子
    useEffect(() => {
      getCategories(0);
      
    }, []);

    // 定义card的开头
    const title = (
      <span>
        <ButtonLink onClick={()=>navigate(-1)}> <ArrowLeftOutlined /></ButtonLink>
        <span>{update=== 0 ? '添加商品' :'修改商品'}</span>
        {/* <span>?</span> */}     
      </span>
  )
  
    return (
      // <div className='card-add'>
      <Card
        title={title}
        style={{
          margin: 20,
          textAlign: 'left'
        }}
      >
        <Form
          name="wrap" //名称 用于回调
          labelCol={{
            flex: '110px', //用于设置标签的固定宽度
          }}
          labelAlign="left"
          labelWrap  //控制是否启用标签换行
          wrapperCol={{ //控制表单项输入框的布局。这里设置了一个对象，使用了弹性盒子布局，并且占据了剩余空间。
            flex: 1,
          }}
          colon={true}  //控制是否在标签后面显示冒号  显示冒号
          style={{
            maxWidth: 600,
          }}
          initialValues={initialValues} //设置表单项的初始值
          
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入商品名称"
              },
            ]}
          >
            <Input/>
          
          </Form.Item>

          <Form.Item
            label="商品描述"
            name="desc"
            rules={[
              {
                required: true,
                message: "请输入商品描述"
              },
            ]}
          >
            <TextArea autoSize />
            
          </Form.Item>
            
          <Form.Item
            label="商品价格"
            name="price"
            rules={[
              {
                required: true,
                message: "请输入商品价格"
              },
            ]}
          >
            <Input type='number' addonAfter="元" />
          </Form.Item>

          <Form.Item
            label="商品分类"
            name="class"
          >
            <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />
          </Form.Item>

          <Form.Item
            label="商品图片"
            name="imgs"
            
          >
            <PictureWalls imgs = {imgs} ref={pictureWallsRef}></PictureWalls>
          </Form.Item>

          <Form.Item
            label="商品详情"
            name="detail"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
            
          >
            {update ? <RichTextEditor detail={products.detail} ref={richTextEditorRef} /> :
              <RichTextEditor detail={""} ref={richTextEditorRef} />}
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType="submit"> 提交 </Button>
            <Button onClick={() => navigate(-1)} style={{ marginLeft: 10}}> 返回</Button>
          </Form.Item>
        </Form>
        
      </Card>
      // </div>
    )
  }

