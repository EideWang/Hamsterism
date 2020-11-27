<template>
  <div>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div class="container-fluid" v-else>
      <div class="wrapper col-md-10">
        <div v-if="isAdmin">
          <base-button @click="editRoute">Edit</base-button>
          <base-button @click="isDeleteAlert = true">Delete</base-button>
          <base-dialog :show="isDeleteAlert" @close="closeDeleteAlert">
            <template #header>Make sure to delete the note?</template>
            <template #message>Once deleted, all data of this note cannot be retrieved!!</template>
            <template #actions>
              <base-button @click="deleteNote">Delete the Note</base-button>
              <base-button @click="closeDeleteAlert">Cancel</base-button>
            </template>
          </base-dialog>
        </div>
        <div class="container p-0">
          <div class="col p-0">
            <h1>{{ note.title }}</h1>
            <div>
              <span id="classification">#{{ note.classification }}</span>
              <span id="date">{{ date }}</span>
            </div>

            <pre id="description">{{ note.description }}</pre>
            <div id="separate-line"></div>
            <section id="content">
              <div v-html="note.content" v-highlight></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["noteId"], //auto get from route parameter :noteId
  data() {
    return {
      note: {},
      date: "",
      isLoading: false,
      isDeleteAlert: false,
    };
  },
  created() {
    this.loadNote();
  },
  computed: {
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
  },
  methods: {
    editRoute() {
      const route = "/notes/" + this.noteId + "/edit";
      this.$router.push(route);
    },
    async deleteNote() {
      await this.$store.dispatch("notes/deleteNote", this.noteId);
      this.$router.replace({ name: "Notes" });
      this.isDeleteAlert = false;
    },
    async loadNote() {
      this.isLoading = true;
      await this.$store.dispatch("notes/loadANote", this.noteId);
      this.note = this.$store.state.notes.note;
      //attributes
      // classification:
      // content:
      // createdDate:
      // description:
      // title:
      var time = new Date(this.note.createdDate);
      //調整date顯示的function
      function formatDate(date) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      }
      time = formatDate(time);
      // console.log(time);
      this.date = time;
      this.isLoading = false;
    },
    closeDeleteAlert() {
      this.isDeleteAlert = false;
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

.container {
  padding: 1rem 0;
}

#classification {
  color: #76c2f7;
}
#date {
  display: block;
}

#description {
  font-size: 1rem;
  margin: 0;
  font-family: "Hind", sans-serif;
  overflow: hidden;
  white-space: pre-line;
}
@media (min-width: 576px) {
  #date {
    float: right;
  }
}

#separate-line {
  height: 2px;
  width: 100%;
  background: #ecf4fe;
  background: linear-gradient(
    90deg,
    rgba(236, 244, 254, 0) 0%,
    rgba(230, 166, 174, 0.25) 20%,
    rgba(224, 81, 87, 1) 50%,
    rgba(231, 179, 187, 0.25) 80%,
    rgba(236, 244, 254, 0) 100%
  );
  margin: 1rem 0;
}

#content div >>> .ql-syntax {
  background-color: #282c34;
  color: #f8f8f2;
  overflow: auto;
  padding: 0.7rem;
  border-radius: 5px;
}

#content div >>> blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}

#content >>> img {
  max-width: 100%;
  display: block;
  margin: auto;
}
</style>
