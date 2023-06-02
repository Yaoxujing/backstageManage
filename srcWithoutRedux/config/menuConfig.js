// const menuList = []
// export default menuList
// 这里是图标插件

import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  BarsOutlined,
  AlignLeftOutlined,
  BarChartOutlined,
  PieChartOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const Items = [
  getItem("首页", "/admin/home", <HomeOutlined />),
  getItem("商品", "sub1", <ShoppingOutlined />, [
    getItem("品类管理", "/admin/category", <AlignLeftOutlined />),
    getItem("商品管理", "/admin/product", <BarsOutlined />),
  ]),

  getItem("用户管理", "/admin/user", <UserOutlined />),
  getItem("角色管理", "/admin/role", <UsergroupAddOutlined />),
  getItem("图形图表", "5", <PieChartOutlined />, [
    getItem("柱状图", "/admin/bar", <BarChartOutlined />),
    getItem("折线图", "/admin/line", <LineChartOutlined />),
    getItem("饼状图", "/admin/pie", <PieChartOutlined />),
  ]),
];

export default Items;
