<template>
  <div class="wrapper container">
    <input type="text" v-model="token" />
    <button @click="updateToken">update</button>
    <div>
      <button @click="show">show current token</button>
    </div>
    <div>
      <button @click="load">load current token</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  methods: {
    async updateToken() {
      await this.$store.dispatch("notes/updateImgurToken", this.token);
      console.log(this.$store.state.notes.imgurToken);
    },
    show() {
      console.log(this.$store.state.notes.imgurToken);
    },
    load() {
      this.$store.dispatch("notes/loadImgurToken");
      console.log("loaded");
    },
  },
};
</script>
<style scoped>
.wrapper {
  background-color: aliceblue;
}
</style>
