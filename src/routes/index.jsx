// 这里配置路由的所有规则
import {lazy,Suspense } from 'react'
import { Navigate } from 'react-router-dom'
// 引入所有组件
import Login from '../pages/login'
import Admin from '../pages/admin'
import Home  from '../pages/home'
// 引入所有的子路由
import Product from '../pages/product'
// import Role from '../pages/role'
// import User from '../pages/user'
// import Bar from '../pages/charts/bar'
// import Line from '../pages/charts/line'
// import Pie from '../pages/charts/pie'
import Category from '../pages/category'
// import AddUpdateProduct from '../pages/product/add-product'
// import DetailProduct from '../pages/product/detail-product'
// import ProductHome from '../pages/product/home'

// const Product = lazy(() => import('../pages/product'));
const Role = lazy(()=>import('../pages/role'))
const User = lazy(()=>import('../pages/user'))
const Bar = lazy(()=>import('../pages/charts/bar'))
const Line = lazy(()=>import('../pages/charts/line'))
const Pie = lazy(()=>import('../pages/charts/pie'))
// const Category = lazy(()=>import('../pages/category'))
const AddUpdateProduct = lazy(()=>import('../pages/product/add-product'))
const DetailProduct = lazy(()=>import('../pages/product/detail-product'))
const ProductHome = lazy(() => import('../pages/product/home'))

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
                    path: '',
                    element: <Navigate to="home" />
                  },
                {
                    path: 'home',
                    element: <Home />,
                },
                {
                    path: 'category',
                    element: <Category />,
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
                            element: <Suspense><ProductHome /></Suspense>,
                        },
                        {
                            path: 'add-update',
                            element: <Suspense><AddUpdateProduct /></Suspense>,
                        },
                        {
                            path: 'detail-product',
                            element: <Suspense><DetailProduct/></Suspense>,

                        }
                        
                    ]
                },
                {
                    path: 'role',
                    element: <Suspense><Role /></Suspense>,
                },
                {
                    path: 'user',
                    element: <Suspense><User /></Suspense>
                },
                {
                    path: 'pie',
                    element: <Suspense><Pie /></Suspense>,
                },
                {
                    path: 'line',
                    element: <Suspense><Line /></Suspense>,
                },
                {
                    path: 'bar',
                    element: <Suspense><Bar /></Suspense>,
                },
                // {
                //     path:'/',
                //     element:<Home />
                // }
            ]
        },
        {
            path: '/',
            element: < Navigate to="/admin/home" />
        }
            
    ]


export default my_route;