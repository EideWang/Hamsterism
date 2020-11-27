<template>
  <div class="container-fluid">
    <h1>Works List</h1>
    <div class="container admin-area" v-if="isAdmin">
      <form @submit.prevent="addWork">
        <div class="form-group form-inline">
          <label for="title">Title</label>
          <input type="text" class="form-control" name="title" id="title" v-model="title" />
        </div>
        <div class="form-group form-inline">
          <label for="link">Link</label>
          <input type="url" class="form-control" name="link" id="link" v-model="link" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            name="description"
            id="description"
            cols="30"
            rows="4"
            v-model="description"
          ></textarea>
        </div>
        <base-button type="submit">Add</base-button>
        <base-button type="reset">Reset</base-button>
      </form>
    </div>
    <loading-spinner v-if="isLoading"></loading-spinner>
    <div class="container" v-else>
      <div class="col">
        <base-card v-for="work in workList" :key="work.title">
          <h2>
            <a :href="work.link" target="_blank" class="work-title">{{ work.title }}</a>
          </h2>
          <pre id="description">{{ work.description }}</pre>
          <base-button v-if="isAdmin" :value="work.id" @click="alertDelete">Delete</base-button>
        </base-card>
        <base-dialog :show="isDeleteAlert" @close="closeDeleteAlert">
          <template #header>Make sure to delete the work?</template>
          <template #message>Once deleted, all data of this work cannot be retrieved!!</template>
          <template #actions>
            <base-button @click="deleteWork">Delete the Work</base-button>
            <base-button @click="closeDeleteAlert">Cancel</base-button>
          </template>
        </base-dialog>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      link: "",
      isLoading: false,
      isDeleteAlert: false,
      deleteWorkId: null,
      workList: [],
    };
  },
  created() {
    if (this.$store.state.works.workList.length === 0) {
      this.loadWorkList();
    }
    this.workList = this.sortList(this.$store.state.works.workList);
  },
  computed: {
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
  },
  methods: {
    sortList(list) {
      const sortedList = list.sort(function(a, b) {
        var titleA = a.title.toUpperCase(); // ignore upper and lowercase
        var titleB = b.title.toUpperCase(); // ignore upper and lowercase
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

      return sortedList;
    },
    async loadWorkList() {
      this.isLoading = true;
      await this.$store.dispatch("works/loadWorks");
      this.workList = this.sortList(this.$store.state.works.workList);
      this.isLoading = false;
    },
    async addWork() {
      const newWork = {
        title: this.title,
        description: this.description,
        link: this.link,
      };
      await this.$store.dispatch("works/addWork", newWork);
      //reset input value
      (this.title = ""), (this.description = ""), (this.link = "");
      this.workList = this.sortList(this.$store.state.works.workList);
    },
    async deleteWork() {
      const workId = this.deleteWorkId;
      if (workId) {
        await this.$store.dispatch("works/deleteWork", workId);
      }
      this.isDeleteAlert = false;
    },
    alertDelete(event) {
      this.isDeleteAlert = true;
      this.deleteWorkId = event.target.value;
    },
    closeDeleteAlert() {
      this.isDeleteAlert = false;
    },
  },
};
</script>
<style scoped>
.admin-area {
  background-color: #ecf4fe;
  padding: 1rem;
  margin-bottom: 2rem;
}
.container-fluid {
  overflow-y: auto;
}
h1 {
  color: #ecf4fe;
  margin: 1.5rem 0;
  text-align: center;
}
h2 {
  color: #ecf4fe;
  margin: 0;
  text-align: left;
}
.work-title {
  text-decoration: none;
  color: #e05157;
}
.work-title:hover {
  text-decoration: underline;
}
#description {
  margin: 0;
  text-align: left;
  font-family: "Hind", sans-serif;
  overflow: hidden;
  white-space: pre-line;
  font-size: 1rem;
}
#description::selection {
  background: #fcf0e2;
  color: #0b67f1;
}

#title,
#link {
  width: 80%;
}
label {
  margin: 0 2rem;
}
</style>
