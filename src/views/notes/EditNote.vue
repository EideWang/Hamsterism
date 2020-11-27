<template>
  <div class="container-fluid ">
    <div class="wrapper col-md-10">
      <form @submit.prevent="save">
        <div class="form-group form-inline">
          <label for="title" class="mr-sm-2">Title</label>
          <input type="text" class="form-control" name="title" id="title" v-model="title" />
        </div>
        <div class="form-group form-inline">
          <label for="classification" class="mr-sm-2">Classification</label>
          <select
            class="form-control mr-sm-4"
            name="classification"
            id="classification"
            v-model="classification"
          >
            <option v-for="option in classificationList" :key="option" :value="option">{{
              option
            }}</option>
          </select>
          <div>
            <input
              type="text"
              name="newClassification"
              id="newClassification"
              v-model="newClassification"
              class="form-control"
            />
            <base-button type="button" @click="submitAddClassification">
              Add New Classification
            </base-button>
          </div>
        </div>
        <div class="form-group">
          <label for="Description">Description</label>
          <textarea
            class="form-control"
            name="Description"
            id="Description"
            cols="30"
            rows="4"
            v-model.lazy="description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <vue-editor
            id="content"
            useCustomImageHandler
            @imageAdded="handleImageAdded"
            v-model.lazy="content"
          ></vue-editor>
        </div>
        <base-button type="submit">Save</base-button>
        <base-button type="button" @click="undoChange">Undo Change</base-button>
      </form>
      <h2 class="mt-3">Preview</h2>
      <base-button type="button" @click="togglePreview">{{ togglePreviewBtn }}</base-button>
      <div v-if="showPreview" v-html="content" id="preview" v-highlight></div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue3-editor";
import axios from "axios";
export default {
  props: ["noteId"],
  components: { VueEditor },
  data() {
    return {
      note: {},
      title: "",
      description: "",
      content: "",
      classification: null,
      newClassification: "",
      showPreview: false,
      togglePreviewBtn: "Show",
    };
  },
  created() {
    this.load();
    this.$store.dispatch("notes/loadClassificationList");
  },
  computed: {
    classificationList() {
      const list = this.$store.state.notes.classificationList;
      // console.log("in computed");
      // console.log(list);
      var newList = [];
      list.forEach(function(element) {
        newList.push(element.title);
      });
      newList.sort(function(a, b) {
        var nameA = a.toUpperCase(); // ignore upper and lowercase
        var nameB = b.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      return newList; // ex. ['html',''css','Javascript']
    },
  },
  methods: {
    async save() {
      //update db
      const newNote = {
        id: this.noteId,
        classification: this.classification,
        content: this.content,
        createdDate: new Date().getTime(),
        description: this.description,
        title: this.title,
      };
      await this.$store.dispatch("notes/editNote", newNote);
      this.$router.replace({ name: "Note", params: { noteId: this.noteId } });
      //不知為何用path:"notes/:noteId"的方式，會產生無法正確導向、route重複的問題--->會變成notes/:noteId/notes/:noteId
    },
    async load() {
      await this.$store.dispatch("notes/loadANote", this.noteId);
      this.note = this.$store.state.notes.note;
      this.title = this.note.title;
      this.description = this.note.description;
      this.content = this.note.content;
      this.classification = this.note.classification;

      //attributes
      // classification:
      // content:
      // createdDate:
      // description:
      // title:
    },
    undoChange() {
      this.title = this.note.title;
      this.description = this.note.description;
      this.content = this.note.content;
      this.classification = this.note.classification;
    },
    async submitAddClassification() {
      const newList = this.$store.state.notes.classificationList;
      newList.push({ title: this.newClassification });
      await this.$store.dispatch("notes/addClassidication", newList);
      this.newClassification = null;
    },
    togglePreview() {
      this.showPreview = !this.showPreview;
      if (this.showPreview) {
        this.togglePreviewBtn = "Hide";
      } else {
        this.togglePreviewBtn = "Show";
      }
    },
    handleImageAdded(file, Editor, cursorLocation) {
      var formData = new FormData();
      formData.append("image", file);

      axios({
        crossDomain: true,
        // processData: false,
        url: "https://api.imgur.com/3/image",
        method: "POST",
        headers: {
          // Authorization: "Bearer " + "8bd7daae37cf9fb74478f58dd1c8c4f629d7fa92",
          Authorization: "Client-ID " + "cd2b0ba9f996e73",
        },
        data: formData,
      })
        .then((result) => {
          console.log(result);
          let url = result.data.data.link;
          Editor.insertEmbed(cursorLocation, "image", url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.wrapper {
  background-color: #ecf4fe;
  padding: 1rem;
  text-align: left;
  margin: 1rem auto 1rem;
}
#preview {
  text-align: left;
  border: 3px solid #919191;
  border-radius: 5px;
  margin-bottom: 30px;
  padding: 10px;
}
#preview >>> .ql-syntax {
  background-color: #282c34;
  color: #f8f8f2;
  overflow: auto;
  padding: 0.7rem;
  border-radius: 5px;
}
#preview >>> blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}

#preview >>> img {
  max-width: 100%;
  display: block;
  margin: auto;
}

#title {
  display: flex;
  flex: 1 1 auto;
}
</style>
