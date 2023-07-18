import { SET_HEAD_TITLE } from "../constant";
// 设置头部标题的同步action
export const setHeadTitle = (headTitle) => ({
  type: SET_HEAD_TITLE,
  data: headTitle,
});
