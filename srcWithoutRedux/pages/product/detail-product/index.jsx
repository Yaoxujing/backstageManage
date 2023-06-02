import React from 'react'
import { Card } from 'antd'
import { List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './index.less'
import ButtonLink from '../../../components/button-link';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BASE_IMG_URL } from '../../../utils/constants';


export default function AddUpdateProduct() {
  const location = useLocation();
  const { products} = location.state || {}
  // console.log(pageNum)

  const navigate = useNavigate()

  function backToHome() {
    // 怎么样在返回的时候 保持原有的page?
    navigate(-1)
  }

  const cardTopTitle = (
    <div>
      <ButtonLink onClick={backToHome}><ArrowLeftOutlined /></ButtonLink>
      <span>商品详情</span>
    </div>
  )
  
  return (
    <div className='card-add'>
      <Card
        title={cardTopTitle}
        style={{
          width: 850,
        }}
      >
      <List>
          <List.Item>
            <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品名称:</span>
            <span>{products.name}</span>
          </List.Item>
          <List.Item>
            <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品描述:</span>
            <span>{products.desc}</span>
          </List.Item>
          <List.Item>
            <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品价格:</span>
            <span>{products.price}元</span>
          </List.Item>
          {/* <List.Item> */}
            {/* <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>所属分类:</span> */}
            {/* 这个不想写了 就是根据id 获取分类 */}
            {/* <span>{cName2 ? (cName1 + '-->' + cName2) : cName1}</span> */}
          {/* </List.Item> */}
          <List.Item>
            <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品图片:</span>

            <span>
              {/* 暂无图片 */}
              {
                products.imgs.length>0?(
                  products.imgs.map(img => {
                    return <img src={BASE_IMG_URL + img} alt='img' key={img} style={{width:40,height:40}}/>
                  })
                ):'暂无图片'
              }
            </span>
          </List.Item>
          <List.Item>
            <span style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold' }}>商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: products.detail ? products.detail : '暂无详情介绍' }}></span>
          </List.Item>
        </List>

      </Card>
    </div>
  )
}
