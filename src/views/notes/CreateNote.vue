<template>
  <div class="container-fluid ">
    <div class="wrapper  col-md-10">
      <form @submit.prevent="submitNote">
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
        <base-button type="submit">Submit</base-button>
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
  components: { VueEditor },
  data() {
    return {
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
    this.$store.dispatch("notes/loadClassificationList");
    this.$store.dispatch("notes/loadImgurToken");
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
    async submitNote() {
      const noteData = {
        title: this.title,
        description: this.description,
        content: this.content,
        classification: this.classification,
      };
      await this.$store.dispatch("notes/createNote", noteData);
      this.$router.replace({ name: "Notes" });
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
      const imgurToken = this.$store.state.notes.imgurToken;
      axios({
        crossDomain: true,
        // processData: false,
        url: "https://api.imgur.com/3/image",
        method: "POST",
        headers: {
          Authorization: "Bearer " + imgurToken,
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
