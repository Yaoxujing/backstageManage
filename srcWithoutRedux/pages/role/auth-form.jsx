import { TreeSelect } from 'antd';
import { useState ,useEffect} from 'react';
const treeData = [
    {
        value: "/admin/home",
        title: '首页', 
    },
    {
        value: 'sub1',
        title: '商品',
        children: [
        {
            value: '/admin/category',
            title: '品类管理',
        },
        {
            value: '/admin/product',
            title: '商品管理',
        },
        ],
    },
    {
        value: "/admin/user",
        title: '用户管理', 
    },
    {
        value: '/admin/role',
        title: '角色管理', 
    },
    {
        value: '5',
        title: '图形图表',
        children: [
            {
                title: "柱形图",
                value: "/admin/bar",
              },
            {
                value: '/admin/line',
                title: '折线图',
            },
            {
                value: '/admin/pie',
                title: '饼图',
            },
            ],
    }
];

const AuthForm = (props) => {
    // 记录当前父组件传给的角色名称
    const { role ,authForm} = props
    // console.log(role.menus)

    // 自带的应该是记录 value的
    const [value, setValue] = useState();

    // 只要一改变就检测到
    const onChange = (newValue) => {
        setValue(newValue);
        };

    // 每次addForm改变的时候就 更新表单数据
    useEffect(() => {
        // 通过父组件给子组件传递的addForm函数给父组件传数据
        authForm(value);
    }, [value]);

    // 根据新传入的role来更新checkedKeys状态
    useEffect(() => {
        setValue(role.menus)
    }, [role]);

    return (
    //   角色名称
        <div>
            <p> 角色名字:{role.name} </p>
            <TreeSelect
                treeCheckable
                defaultValue={role.menus}
                // ref ={myForm}
                showSearch
                style={{
                    width: '100%',
                }}
                value={value}
                dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                }}
                placeholder={role.name}
                allowClear
                multiple
                treeDefaultExpandAll
                onChange={onChange}
                treeData={treeData}
                />
        </div>
       
  );
};
export default AuthForm;