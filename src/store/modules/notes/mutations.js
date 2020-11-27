export default {
  setNotes(state, payload) {
    //載入notes至store內
    var noteData = [];
    for (var note in payload) {
      var data = {
        ...payload[note],
        id: note,
      };
      noteData.push(data);
    }
    state.notes = noteData;
  },
  createNote(state, payload) {
    //新建note後，把新的note加入store.notes內
    state.notes.unshift(payload);
  },
  getANote(state, payload) {
    state.note = payload;
  },
  editNote(state, payload) {
    //payload is updated note
    state.note = payload;
  },
  deleteNote(state, payload) {
    //payload is noteId
    //清空state note
    state.note = {};
    //移除state notes內的該id note
    state.notes = state.notes.filter((note) => note.id !== payload);
  },
  setClassidicationList(state, payload) {
    state.classificationList = payload;
  },
};
