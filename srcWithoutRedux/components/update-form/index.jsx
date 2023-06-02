// 这个是category里面的一个小组件 用来修改一个类别

import React, { useEffect, useRef } from 'react';
import { Form, Input} from 'antd';

function UpdateForm(props) {
    // 函数组件传参数通过 props 接收
    /* 参数：category  表示 当前选择的类
             parentId 表示 当前父组件的id
             updateForm 表示 一个函数 传递 Form
    */
    const { category, parentId, updateForm } = props;
    
    // 使用ref获取到 form的值
    const myForm = useRef(null);
    const inputName = '请输入更新后的名字(原来名称是：' + category.name + ")" 
    
    // 只要更新了updateForm 和 parentId 就传参数 或者更新表单
    useEffect(() => {
        updateForm(myForm);
        myForm.current.setFieldsValue({ parentId });
        }, [updateForm, parentId]);

    return (
        <Form ref={myForm} initialValues={{ parentId }}>
            <Form.Item name='updateName'>
                <Input placeholder={inputName} />
            </Form.Item>
        </Form>
    );
}

export default UpdateForm;