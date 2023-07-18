// 接口请求函数

import ajax from "./ajax";

const BASE = "/api";
// const BASE = "http://localhost:3000";

// 请求登陆接口
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");

// 天气查询 不需要跨域 所以就没用 jsonp
export const reqWeather = (city = "shangyu") => {
  // 这里只有两个城市可以选
  // 如果需要接口文件 需要改个表格和地点的映射
  let cityCode = 330604;
  if (city === "shangyu") {
    cityCode = 330604;
  } else if (city === "jianggan") {
    cityCode = 330104;
  }
  // api2 是默认配置的 其路径在 admin-react\src\setupProxy.js 中
  const URL = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=6f82f24c2ed061fd401d95e4eb55a054&extensions:all`;
  return ajax(URL, {}, "GET");
};

// 获取一级/二级分类的列表 根据id 返回名字
export const reqCategory = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId });

// 添加分类列表 分开接收参数
export const reqAddCategory = (parentId, categoryName) =>
  ajax(BASE + "/manage/category/add", { parentId, categoryName }, "POST");

// 更新分类列表
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");

// 获取商品分页的列表
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", { pageNum, pageSize });

// 根据ID/Name搜索产品分页列表
export const reqSearchProducts = (pageNum, pageSize, searchName, searchType) =>
  ajax(BASE + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });

// 更新获取上下架
export const updateStatus = (productId, status) =>
  ajax(
    BASE + "/manage/product/updateStatus",
    {
      productId,
      status,
    },
    "POST"
  );

export const reqDeleteImg = (name) =>
  ajax(
    BASE + "/manage/img/delete",
    {
      name,
    },
    "POST"
  );

// 添加/修改商品
export const reqAddOrUpdateProduct = (product) =>
  ajax(
    BASE + "/manage/product/" + (product._id ? "update" : "add"),
    product,
    "POST"
  );

// 获取角色列表
export const reqRoles = () => ajax(BASE + "/manage/role/list");

// 添加角色
export const reqAddRoles = (roleName) =>
  ajax(BASE + "/manage/role/add", { roleName }, "POST");

// 更新角色
export const reqUpdateRoles = (role) =>
  ajax(BASE + "/manage/role/update", role, "POST");

// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + "/manage/user/list");

// 删除指定用户
export const reqDeleteUsers = (userId) =>
  ajax(BASE + "/manage/user/delete", { userId }, "POST");

// 添加用户
export const reqAddUser = (user) =>
  ajax(BASE + "/manage/user/add", user, "POST");

// 更新用户
export const reqUpdateUser = (user) =>
  ajax(BASE + "/manage/user/update", user, "POST");
