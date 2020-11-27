<template>
  <the-header class="header"></the-header>
  <div class="content">
    <router-view v-slot="{ Component }" :key="$route.fullPath">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script>
import TheHeader from "./components/layout/TheHeader.vue";
import $ from "jquery";
export default {
  components: {
    TheHeader,
  },
  created() {
    this.$store.dispatch("auth/autoLogin");
  },
  mounted() {
    //navbar點擊收合紐外的其他地方時，自動收合
    $(document).ready(function() {
      $(document).click(function(event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickover.hasClass("navbar-toggler")) {
          $(".navbar-toggler").click();
        }
      });
    });
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap");
*,
*::after,
*::before {
  box-sizing: inherit;
}

body {
  height: 100%;
  margin: 0px;
  background-color: #3a495f;
  overflow: auto;
  box-sizing: border-box;
}
*::selection {
  background: #fcf0e2;
  color: #0b67f1;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
.header {
  z-index: 1000;
}
#app {
  font-family: "Hind", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3a495f;
  display: flex;
  flex-direction: column;
  background-color: #3a495f;
  min-height: 100vh;
}
.content {
  margin-top: 3.5rem;
  // overflow-y: auto;
  // overflow-x: hidden;
  // will-change: scroll-position;
}
/* Scrollbar Design */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #3a495f;
}

::-webkit-scrollbar-thumb {
  background: #e05157;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
