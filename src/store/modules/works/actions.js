import fb from "../../../firebase.js";

export default {
  async loadWorks(context) {
    try {
      var responseData = [];
      await fb
        .database()
        .ref("works")
        .once("value", function(snapshot) {
          const list = snapshot.val();
          //遍歷物件的方法
          for (let work in list) {
            responseData.push(list[work]);
          }
        });
    } catch (e) {
      console.log(e);
      return;
    }
    context.commit("setWorkList", responseData);
  },

  async addWork(context, payload) {
    //payload should be new workList   {id:..., title:..., description:..., link:...}
    //used for set, edit, delete
    const workId = await fb
      .database()
      .ref()
      .child("works")
      .push().key;
    const workData = {
      id: workId,
      title: payload.title,
      description: payload.description,
      link: payload.link,
    };
    //新增works內的work資料
    await fb
      .database()
      .ref("works/" + workId)
      .set(workData);
    context.commit("addWork", payload);
  },
  async deleteWork(context, payload) {
    //payload should be workId
    await fb
      .database()
      .ref("works/" + payload)
      .remove();
    context.commit("deleteWork", payload);
  },
};
