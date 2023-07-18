/*
 1.该文件用于创建一个为Count组件服务的reducer , reducer 的本质就是个函数

 1）reducer的本质是一个函数，接收：preState,action，返回加工后的状态
 2）reducer有两个作用：初始化状态，加工状态
 3）reducer被第一次调用时，是store自动触发的。传递的preState是undefined，传递的action是:{type:'@@REDUX/INIT_a.2.b.4}
 */

//  用来管理头部标题的reducer函数
// import { INCREMENT, DECREMENT } from "../constant";
import { SET_HEAD_TITLE } from "../constant";
const initState = "首页"; //初始化状态

export default function countReducer(preState = initState, action) {
  // if (preState === undefined) preState = 0;
  const { type, data } = action;
  // console.log(type, data);
  // 根据type 决定如何加工数据
  switch (type) {
    case SET_HEAD_TITLE:
      return data;
    default:
      return preState;
  }
}
