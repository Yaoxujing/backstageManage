// 这里配置路由的所有规则

import { Navigate } from 'react-router-dom'
// 引入所有组件
import Login from '../pages/login'
import Admin from '../pages/admin'
import Home  from '../pages/home'
// 引入所有的子路由
import Product from '../pages/product'
import Role from '../pages/role'
import User from '../pages/user'
import Bar from '../pages/charts/bar'
import Line from '../pages/charts/line'
import Pie from '../pages/charts/pie'
import Category from '../pages/category'
import AddUpdateProduct from '../pages/product/add-product'
import DetailProduct from '../pages/product/detail-product'
import ProductHome from '../pages/product/home'

const my_route = 
    [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/admin',
            element: <Admin />,
            children: [
                {
                    path: 'home',
                    element: <Home />,
                },
                {
                    path: 'category',
                    element: <Category />
                },
                {
                    path: 'product',
                    element: <Product />,
                    children: [
                        {
                            path: '',
                            element: <Navigate to="product-home" />,
                        },
                        {
                            path: 'product-home',
                            element: <ProductHome />
                        },
                        {
                            path: 'add-update',
                            element: <AddUpdateProduct />
                        },
                        {
                            path: 'detail-product',
                            element: <DetailProduct/>

                        }
                        
                    ]
                },
                {
                    path: 'role',
                    element: <Role />
                },
                {
                    path: 'user',
                    element: <User />
                },
                {
                    path: 'pie',
                    element: <Pie />
                },
                {
                    path: 'line',
                    element: <Line />
                },
                {
                    path: 'bar',
                    element: <Bar />
                },
                
            ]
        },
        {
            path: '/',
            element: < Navigate to="/admin" />
        }
            
    ]


export default my_route;