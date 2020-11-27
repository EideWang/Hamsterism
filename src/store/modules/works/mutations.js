export default {
  setWorkList(state, payload) {
    //payload should be Array
    //like [{id:..., title:..., description:..., link:...},{id:..., title:..., description:..., link:...}...]
    state.workList = payload;
  },
  addWork(state, payload) {
    state.workList.push(payload);
  },
  deleteWork(state, payload) {
    //移除該workId(payload)
    state.workList = state.workList.filter((work) => work.id !== payload);
  },
};
