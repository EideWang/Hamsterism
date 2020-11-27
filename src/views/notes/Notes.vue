<template>
  <div class="container-fluid">
    <div class="row justify-content-around">
      <div id="classification" class="unselectable">
        <div class="accordion" :class="accordionClasses">
          <div class="accordion-header" @click="toggleOpen">
            Classification List<span id="triangle">{{ triangle }}</span>
          </div>
          <div class="accordion-list">
            <classification-list
              :list="classificationList"
              @filtering="filtering"
            ></classification-list>
          </div>
        </div>
      </div>

      <div id="notes" class="col-md-10">
        <loading-spinner v-if="isLoading"></loading-spinner>
        <div v-if="isAdmin">
          <base-button type="button" @click="goCreateNote">New Note</base-button>
        </div>
        <div v-if="!isLoading">
          <ul id="noteList">
            <note-list
              v-for="note in notes"
              :key="note.id"
              :noteId="note.id"
              :title="note.title"
              :classification="note.classification"
              :createdDate="convertTime(note.createdDate)"
              :description="note.description"
            ></note-list>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NoteList from "../../components/notes/NoteList.vue";
import ClassificationList from "../../components/notes/ClassificationList.vue";

export default {
  components: {
    NoteList,
    ClassificationList,
  },
  data() {
    return {
      notes: [],
      newClassification: "",
      isLoading: false,
      filteredClassification: "All Notes",
      isOpen: false,
    };
  },
  computed: {
    accordionClasses() {
      return { show: !this.isOpen };
    },
    triangle() {
      return this.isOpen ? "\u25B4" : "\u25BE";
    },
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
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
  created() {
    this.loadClassificationList();
    if (this.$store.state.notes.notes.length === 0) {
      this.loadNotes();
    }
    this.notes = this.sortByCreatedDate(this.$store.state.notes.notes);
  },
  methods: {
    sortByCreatedDate(noteArray) {
      const sortedArray = noteArray.sort(function(a, b) {
        //用array.reverse()不夠好，改用時間排序
        var aDate = Number(a.createdDate);
        var bDate = Number(b.createdDate);
        return bDate - aDate; //降冪
      });
      return sortedArray;
    },
    async loadNotes() {
      this.isLoading = true;
      await this.$store.dispatch("notes/loadNotes");
      this.notes = this.sortByCreatedDate(this.$store.state.notes.notes);
      this.isLoading = false;
    },
    async loadClassificationList() {
      await this.$store.dispatch("notes/loadClassificationList");
    },
    goCreateNote() {
      this.$router.push({ name: "CreateNote" });
    },
    async filtering(selectedClassification) {
      if (this.filteredClassification === selectedClassification) {
        console.log("過濾清單一樣，不執行冗動作");
        return;
      }
      if (!selectedClassification) {
        console.log("分類無值");
        return;
      }
      this.isLoading = true;
      this.notes = this.sortByCreatedDate(this.$store.state.notes.notes);
      // await this.loadNotes();
      this.filteredClassification = selectedClassification;
      if (selectedClassification !== "All Notes") {
        this.notes = this.notes.filter(
          (note) => note.classification === this.filteredClassification
        );
      }
      this.isLoading = false;
    },
    convertTime(originTime) {
      var time = new Date(originTime);
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
      return time;
    },
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<style scoped>
#classification {
  height: auto;
  background-color: #ecf4fe;
  box-sizing: border-box;
  margin: 1rem 1rem 0 1rem;
  flex: 1 1 auto;
}

#notes {
  background-color: #ecf4fe;
  box-sizing: border-box;
  margin: 1rem;
  overflow-y: auto;
  height: auto;
}
#noteList {
  padding: 1rem 0;
}
.accordion-header {
  background-color: #fcf0e2;
  padding: 0.5rem 0;
  cursor: pointer;
}
#triangle {
  float: right;
  transform: scale(2);
  margin-right: 1rem;
  margin-top: 0.2rem;
}
.accordion-list {
  max-height: 1000px;
  transition: max-height 0.3s ease-in-out;
}
.show .accordion-list {
  /* display: none; */
  max-height: 0;
  transition: max-height 0.2s cubic-bezier(0, 1, 0, 1);
}
.show {
  margin-bottom: -0.5rem;
}

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
@media (min-width: 768px) {
  #classification {
    height: calc(100vh - 5.5rem);
    overflow-y: auto;

    box-sizing: border-box;
    margin: 1rem;
    flex: 1 1 auto;
  }
  #notes {
    box-sizing: border-box;
    margin: 1rem 1rem 1rem 0;
    overflow-y: auto;
    height: calc(100vh - 5.5rem);
  }

  .accordion-list {
    display: block;
  }
  .accordion-header {
    display: none;
  }
  .show .accordion-list {
    display: block;
  }
  #noteList {
    padding: 0 2rem;
  }
}
</style>
