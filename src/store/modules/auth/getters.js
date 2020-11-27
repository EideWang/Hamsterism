export default {
  //這裡其實可以簡化都刪掉，有點多此一舉
  //留著表示曾經多此一舉~
  userId(state) {
    return state.userId;
  },
  // token(state) {
  //   //好像用不到
  //   return state.token;
  // },
  isAuthenticated(state) {
    return !!state.token;
  },
  isAdmin(state) {
    return state.isAdmin;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
