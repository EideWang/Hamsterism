<template>
  <div class="container">
    <!-- <form @submit.prevent="login"> -->
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Account Email</label>
        <input type="email" name="email" id="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="password" />
      </div>
      <base-button type="submit">Login</base-button>
      <base-button type="button" @click="$router.go(-1)">Go Back</base-button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "guest@hamsterism.com", //default guest account for user
      password: "guest1234",
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });
      } catch (e) {
        console.log(e.message);
        return;
      }
      this.$router.go(-1);
    },
  },
};
</script>
<style scoped>
form {
  margin-top: 4rem;
}
label {
  color: #ecf4fe;
  font-size: 1.3rem;
  margin-right: 0.5rem;
}
</style>
