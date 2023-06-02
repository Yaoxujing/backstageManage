// import localStorage from "localStorage";
// 可以用这个库去存数据
import store from "store";

const USER_KEY = "user_key";
const PAGE_KEY = "page_num";

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
  // 保存当前页数
  getPageNum() {
    return store.get(PAGE_KEY) || 1;
  },
};
export default storageUtils;
