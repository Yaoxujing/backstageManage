import React from 'react'
import { useEffect, useRef } from 'react';
import { Form, Input } from 'antd';



export default function AddForm(props) {
    const myForm = useRef(null);
    const { addForm } = props;

    // 每次addForm改变的时候就 更新表单数据
    useEffect(() => {
        // 通过父组件给子组件传递的addForm函数给父组件传数据
        addForm(myForm);
    }, [addForm]);
    
    return (
        <div>
            <Form ref={myForm}>
                <Form.Item name='role'
                rules={[{ required: true, message: '角色必须输入' }]}>
                    <Input placeholder='请输入角色名' />
                    
                </Form.Item>
            </Form>
        </div>
    )
}