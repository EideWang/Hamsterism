<template>
  <li
    id="all-notes"
    @click="emitFiltering"
    :class="{ selected: selectedClassification === 'All Notes' }"
  >
    {{ "All Notes" }}
  </li>
  <li
    v-for="item in list"
    :key="item"
    @click="emitFiltering"
    :class="{ selected: item === selectedClassification }"
  >
    {{ item }}
  </li>
</template>

<script>
export default {
  props: ["list"],
  emits: ["filtering"],
  data() {
    return {
      selectedClassification: "All Notes",
    };
  },
  methods: {
    emitFiltering(event) {
      //使用event.target取得li內的值(innerHTML)
      this.selectedClassification = event.target.innerHTML;
      this.$emit("filtering", this.selectedClassification);
    },
  },
};
</script>
<style scoped>
li {
  list-style-type: none;
  padding: 0;
  margin: 0.5rem;
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: 2px solid #ecf4fe;
}
li:hover {
  border-bottom: 2px solid #e05157;
  text-shadow: 1px 1px 1px #5a5a5a;
}

.selected {
  border-bottom: 2px solid #e05157;
  text-shadow: 1px 1px 1px #5a5a5a;
}
</style>
