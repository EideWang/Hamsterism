<template>
  <nav class="navbar navbar-expand-md fixed-top navbar-dark unselectable">
    <router-link class="navbar-brand" to="/">
      <img src="../../assets/img/logo.png" id="nav-logo" />
      <span id="nav-logo-text">Hamsterism</span>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#theheader"
      aria-controls="theheader"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="theheader">
      <ul class="navbar-nav ml-auto mt-2 mb-2 mt-md-0 mb-md-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/notes">Notes</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/works">Works</router-link>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link class="nav-link logout-btn" to="/login">Login</router-link>
        </li>
        <li class="nav-item" v-else>
          <button class="nav-link logout-btn" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      activeLink: "",
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    didAutoLogout() {
      return this.$store.getters["auth/didAutoLogout"];
    },
  },
  watch: {
    didAutoLogout(currentVal, oldVal) {
      if (currentVal && currentVal !== oldVal) {
        this.$router.replace({ name: "Login" });
      }
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.replace("/");
    },
    activate(event) {
      this.activeLink = event.target.innerHTML;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap");
#nav-logo {
  width: 3.5rem;
  height: 3.5rem;
}
#nav-logo-text {
  margin-left: 0.5rem;
  vertical-align: bottom;
  font-size: 2rem;
}
.navbar {
  min-height: 3.5rem;
  background-color: #76c2f7;
  color: #ecf4fe;
  padding-top: 0;
  padding-bottom: 0;
  font-family: "Kalam", cursive;
}

.nav-link {
  background-color: #76c2f7;
  color: #ecf4fe;
  font-size: 1.5rem;
  opacity: 0.7;
  padding: 0.6rem 0 0.4rem;
}
.router-link-active,
.nav-link:hover {
  opacity: 1;
  border: none;
}

.navbar-brand {
  background-color: #76c2f7;
  color: #ecf4fe;
  font-family: "Kalam", cursive;
  padding: 0;
  margin: 0;
}

.logout-btn {
  border-radius: 4px;
  border: 0;
  background: #e05157;
  display: inline-block;
  position: relative;
  cursor: pointer;
  text-align: center;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
.logout-btn:focus,
.logout-btn:active {
  outline: none;
}
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (max-width: 767.98px) {
  .navbar-nav .nav-link {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
}
</style>
