// 主要负责 添加或者删除用户的表单

import React from 'react'
import { useEffect, useRef } from 'react';
import { Form, Input ,Select} from 'antd';

export default function AddUser(props) {
  const Option = Select.Option
  // ******************定义初始值*****************
  // 定义获取表单
  const myForm = useRef(null);
  // 接收所有角色，父给子的接口, 是否是修改的值
  const { roles, addForm, update } = props;

  //如果是修改的 就接收当前需要修改的用户
  const user = update ? props.user : {}

  //*******************钩子函数******************
  useEffect(() => {
    addForm(myForm);
    if (!update) myForm.current.resetFields();
    myForm.current.setFieldsValue(user)
  }, [addForm, user])
  
  // 当前还有个bug就是表单 有错误的时候也会提交哈哈哈
  return (
    <Form
      ref={myForm}
      initialValues ={user}
    >
      <Form.Item
        name='username'
        label="用户名"
        rules={[
          {
            required: true,
            message: '请输入你的账号',
          }, 
          {
            min:3,
            message:'用户名至少3位',
          }, {
            max: 12,
            message:'用户名最多12位'
          }, {
            pattern: /^[a-zA-Z0-9]+$/,
            message:'用户名必须是英文、数字或下划线组成'
          }
          
        ]}>
        <Input placeholder='请输入用户名' />
            
      </Form.Item>
      {/* 密码不能修改 */}
      {update? null : (<Form.Item
        name='password'
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入你的密码',
          }, 
          {
            min:3,
            message:'密码至少3位',
          }, {
            max: 12,
            message:'密码最多12位'
          }, {
            pattern: /^[a-zA-Z0-9]+$/,
            message:'密码必须是英文、数字或下划线组成'
          }
          
        ]}>
        <Input placeholder='请输入密码'
          type="password"
        />
            
      </Form.Item>)}
      
      <Form.Item
        name='phone'
        label="手机号"
        rules={[{pattern: /^[0-9]{11}$/, message: '电话号码不正确' }]}
      >
        <Input placeholder='请输入手机号' />
            
      </Form.Item>
      <Form.Item
        name='email'
        label="邮箱"
        rules={[{ pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱不正确' }]}>
            <Input placeholder='请输入邮箱' />
            
      </Form.Item>
      <Form.Item
        name='role_id'
        label="角色ID"
      >
        <Select placeholder='请选择分类'>
          {roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option> )}
        </Select>
            
      </Form.Item>
    </Form>
  )
}
