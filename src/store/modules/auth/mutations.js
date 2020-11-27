export default {
  setUser(state, payload) {
    //payload should be userInfo {userId,email,token}
    state.userId = payload.userId;
    state.isAdmin = false;
    state.didAutoLogout = false;
    if (payload.email === "admin@hamsterism.com") {
      state.isAdmin = true;
    }
    state.token = payload.token;
    // console.log(state.isAdmin);
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
