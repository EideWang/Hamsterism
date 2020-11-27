import fb from "../../../firebase.js";

export default {
  async loadNotes(context) {
    try {
      var responseData;
      await fb
        .database()
        .ref("notes")
        .once("value", function(snapshot) {
          responseData = snapshot.val();
          // console.log("load notes as below");
          // console.log(responseData);
        });
    } catch (e) {
      console.log(e);
    }
    context.commit("setNotes", responseData);
  },
  async loadANote(context, payload) {
    //payload should be noteId (string)
    try {
      var responseData;
      await fb
        .database()
        .ref("notes/" + payload)
        .once("value", function(snapshot) {
          responseData = snapshot.val();
        });
    } catch (e) {
      console.log(e);
    }
    context.commit("getANote", responseData);
  },
  async createNote(context, payload) {
    //payload should be new Note information
    const noteId = await fb
      .database()
      .ref()
      .child("notes")
      .push().key;
    const noteData = {
      id: noteId,
      title: payload.title,
      description: payload.description,
      content: payload.content,
      classification: payload.classification,
      createdDate: new Date().getTime(),
    };
    //新增notes內的note資料
    await fb
      .database()
      .ref("notes/" + noteId)
      .set(noteData);

    context.commit("createNote", noteData);
  },
  async editNote(context, payload) {
    //payload should be updated Note information
    const noteId = payload.id;
    const newNote = {
      classification: payload.classification,
      content: payload.content,
      createdDate: payload.createdDate,
      description: payload.description,
      title: payload.title,
    };
    var updates = {};
    updates["notes/" + noteId] = newNote;
    await fb
      .database()
      .ref()
      .update(updates);

    context.commit("editNote", newNote);
  },
  async deleteNote(context, payload) {
    //payload should be noteId
    await fb
      .database()
      .ref("notes/" + payload)
      .remove();
    context.commit("deleteNote", payload);
  },
  async loadClassificationList(context) {
    var classificationList;
    await fb
      .database()
      .ref("classification/")
      .once("value", function(snapshot) {
        // snapshot.forEach(function)
        classificationList = snapshot.val();
      });
    // console.log("============classificationList in loadClassificationList action ===========");
    // console.log(classificationList);
    context.commit("setClassidicationList", classificationList);
  },
  async addClassidication(context, payload) {
    //payload is already an Array list
    await fb
      .database()
      .ref("classification/")
      .set(payload);

    context.commit("setClassidicationList", payload);
  },
};
