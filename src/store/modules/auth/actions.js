import fb from "../../../firebase.js";
let timer;
export default {
  async login(context, payload) {
    await fb.auth().signInWithEmailAndPassword(payload.email, payload.password);
    const user = await fb.auth().currentUser;

    //設定有效維持登入的時間
    const expiresIn = 28800000; //毫秒 ==>480mins
    const expirationDate = new Date().getTime() + expiresIn;

    //自動登出計時函數
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    localStorage.setItem("userId", user.uid);
    localStorage.setItem("email", user.email);
    localStorage.setItem("token", user.refreshToken);
    localStorage.setItem("expirationDate", expirationDate);

    const userInfo = {
      userId: user.uid,
      email: user.email,
      token: user.refreshToken,
    };

    context.commit("setUser", userInfo);
  },
  autoLogin(context) {
    //不涉及firebase，僅使用localStorage資訊來進行登入動作
    const userId = localStorage.getItem("userId");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");

    const expiresIn = +expirationDate - new Date().getTime(); //新的剩餘時間
    if (expiresIn < 0) {
      return;
    }
    //以新的剩餘時間更新自動登出計時函數
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (userId && email && token) {
      const userInfo = {
        userId: userId,
        email: email,
        token: token,
      };
      context.commit("setUser", userInfo);
    } else {
      console.log("something wrong, invalid value among userId, email, token");
    }
  },
  async logout(context) {
    try {
      await fb.auth().signOut;
    } catch (error) {
      console.log(error.message);
      return;
    }
    //移除localStorage內暫存的data
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    //清空timer
    clearTimeout(timer);
    const userInfo = {
      userId: null,
      email: "",
      token: null,
    };
    context.commit("setUser", userInfo);
  },
  async autoLogout(context) {
    await context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
