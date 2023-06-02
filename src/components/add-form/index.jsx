// 这个是category里面的一个小组件 用来添加一个

import React, { useEffect, useRef } from 'react';
import { Form, Input, Select } from 'antd';
const { Option } = Select;

function AddForm(props) {
    // 函数组件传参数通过 props 接收
    /*
    categories 是所有的列表
    addForm 是 用来更新 form 的函数
     */
    const { categories, parentId, addForm } = props;
    // 这个表单数据是不是给传到父组件呢
    const myForm = useRef(null);

    // 每次addForm 和parentId 改变的时候就 更新表单数据
    useEffect(() => {
        // 设置表单的parentId 的值 为初始值
        myForm.current.setFieldsValue({ parentId });
    }, [parentId])
    
    useEffect(() => {
        // 通过父组件给子组件传递的addForm函数给父组件传数据
        addForm(myForm);
        }, [myForm,addForm]);

    return (
        <Form ref={myForm} initialValues={{ parentId }}>
            <Form.Item
                name='categoryId'
                rules={[{ required: true, message: '分类名称必须输入' }]}
                initialValue={parentId}
            >
                <Select defaultValue={parentId}> 
                    <Option value="0">一级分类</Option>
                    {/* 循环遍历所有的category 显示在选择框中 */}
                    {
                        categories.map(category =>
                        {
                            return <Option key={category._id} value={category._id}>{category.name}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name='categoryName'>
                <Input placeholder='请输入分类名' />
            </Form.Item>
        </Form>
    );
}

export default AddForm;