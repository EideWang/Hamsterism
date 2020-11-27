import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";
export default {
  namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
      isAdmin: false, //是否以admin登入
      didAutoLogout: false, //if true TheHeader會透過watch重新導向login頁面
    };
  },
  getters,
  actions,
  mutations,
};
