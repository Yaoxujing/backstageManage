// import localStorage from "localStorage";
// 可以用这个库去存数据
import store from "store";

const USER_KEY = "user_key";
const PAGE_KEY = "page_num";
const ROUTER_KEY = "router_key";

const storageUtils = {
  // 保存user
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user));
    store.set(USER_KEY, user);
  },
  // 读取user
  getUser() {
    // return JSON.parse(localStorage.getItem(USER_KEY) || "{}");
    return store.get(USER_KEY) || {};
  },
  // 删除user
  removeUser() {
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
  },
  // 保存当前页数
  savePageNum(pageNum) {
    store.set(PAGE_KEY, pageNum);
  },
  // 获取当前页数
  getPageNum() {
    return store.get(PAGE_KEY) || 1;
  },

  // 保存当前key值
  saveKey(key) {
    store.set(ROUTER_KEY, key);
  },

  // 获取当前key值
  getKey() {
    return store.get(ROUTER_KEY) || "/admin/home";
  },
};
export default storageUtils;
