// product的默认子路由组件
import './index.less'
import React, { useState ,useEffect} from 'react'
import { Card, Button, Select, Input, message } from 'antd';
import { Space, Table, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ButtonLink from '../../../components/button-link';
import { reqProducts ,reqSearchProducts,updateStatus } from '../../../api';
import { PAGE_SIZE } from '../../../utils/constants';
import storageUtils from '../../../utils/storageUtils';

import { useNavigate,useLocation} from "react-router-dom";
const { Option } = Select;
export default function ProductHome() {

  // load 转圈的设计
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [pageNum ,setPageNum] = useState(storageUtils.getPageNum())
  const [product, setProduct] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchType, setSearchType] = useState('productName')

  const navigate = useNavigate()
  
  // 表格 的列
  const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (text) => '￥'+text,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width:40,
        render: (_, record) => {
          const {status , _id } = record
          // const _id =1
          return (
              <span>
                <Button
                  type='primary'
                  onClick={() => { onclickChangeStatus(_id, status === 1 ? 2 : 1) }}>
                  {status === 1 ? '下架' : '上架'}
                </Button>
                <span>
                  {status === 1 ? '在售' : '已下架'}
                </span>
              </span>
          )
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <ButtonLink onClick={() => ShowDetail(record)}>详情</ButtonLink>
            <ButtonLink onClick={()=> changeProduct(record)}>修改</ButtonLink>
          </Space>
        ),
      },
  ];

  function ShowDetail(record) {
    // 把pageNum存到 缓存中 为了解决切回去pageNum变了
    storageUtils.savePageNum(pageNum)
    navigate("/admin/product/detail-product", { state: { products: record } })
  }

  // 点击改变商品状态
  async function onclickChangeStatus(id,status) {
    // 如果有搜索的名字
    const result = await updateStatus(id, status);
    // console.log(result)
      if (result.data.status === 0) {
        message.success("改变状态成功！")
        fetchProducts()
      }
  }

  // 点击添加按钮
  function addProduct() {
    storageUtils.savePageNum(pageNum)
    navigate("/admin/product/add-update", { state: { update:0 } })
  }

  // 点击修改
  function changeProduct(record) {
    storageUtils.savePageNum(pageNum)
    navigate("/admin/product/add-update", { state: { update:1 , products: record} })
  }

  // 钩子
  useEffect(() => {
    fetchProducts();
  }, [pageNum]);

  // ajax 按照现有的搜索商品
  async function fetchProducts() {
    // loading的配置
    setLoading(true)
    // 如果有搜索的名字
    if (searchName) {
      // setPageNum(1)
      const result = await reqSearchProducts(pageNum,PAGE_SIZE,searchName,searchType);
      if (result.data.status === 0) {
        let { total, list } = result.data.data
        setProduct(list);
        setTotal(total)
      }
    } else {
      const result = await reqProducts(pageNum,PAGE_SIZE);
      if (result.data.status === 0) {
        let { total, list } = result.data.data
        setProduct(list);
        setTotal(total)
      }
    }
    setLoading(false)
  }
  // 获取所有已上传图片文件名的数组
  const getImgs  = () => {
   return this.state.fileList.map(file => file.name)
  }
  

  const title = (
      <span className='card-title'>
      <Select
        value={searchType}
        style={{ width: 150 }}
        onChange={value => setSearchType(value)}>
              <Option value='productName'>
                  按名称搜索
              </Option>
              <Option value='productDesc'>
                  按描述搜索
              </Option>
          </Select>
      <Input
        onChange={(value) => { setSearchName(value.target.value)}}
        type="text"
        placeholder='关键字'
        style={{ width: 150, margin: '0 15px' }} value={searchName} />
          <Button type='primary' onClick={()=>fetchProducts()}>搜索</Button>
      </span>
  )
  const extra = (
      <Button type="primary" onClick={addProduct}>
            <PlusOutlined /> 添加商品
      </Button>
  )
  return (
    <div className='product-home'>
      <Card
      title={title}
      extra={extra}
      style={{
        width: 850,
      }}
      className='product-card'
    >
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={product}
          pagination={{ total, defaultPageSize: PAGE_SIZE ,defaultCurrent: pageNum}}
          onChange={(pageNumber) => { setPageNum(pageNumber.current)}}
          loading={loading}
        />
      </Card>
    </div>
    
  )
}
