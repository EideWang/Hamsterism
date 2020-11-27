<template>
  <div class="container-fluid">
    <div class="d-flex flex-column align-items-start wrapper">
      <div id="about-tag" class="d-inline-flex">
        <div id="about-me-tag" :class="{ active: selectedTag === 'me' }" @click="selectTag('me')">
          About Me
        </div>
        <div
          id="about-blog-tag"
          :class="{ active: selectedTag === 'blog' }"
          @click="selectTag('blog')"
        >
          About Hamsterism
        </div>
      </div>
      <div id="about-content">
        <transition name="fade" mode="out-in">
          <div id="about-me" v-if="selectedTag === 'me'">
            <about-me></about-me>
          </div>
          <div id="about-blog" v-else>
            <about-blog></about-blog>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import AboutMe from "../../components/about/AboutMe.vue";
import AboutBlog from "../../components/about/AboutBlog.vue";

export default {
  components: {
    AboutMe,
    AboutBlog,
  },
  data() {
    return {
      selectedTag: "me",
    };
  },
  methods: {
    selectTag(tag) {
      this.selectedTag = tag;
    },
  },
};
</script>
<style scoped>
.wrapper {
  margin: 1rem 5%;
}
#about-tag {
  padding: 0 0.5rem;
  z-index: 100;
}
#about-tag .active {
  background-color: #ecf4fe;
  opacity: 1;
}
#about-me-tag,
#about-blog-tag {
  background-color: #b6c3d8;
  padding: 3px 10px 0;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0.7;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#about-me-tag:hover,
#about-blog-tag:hover {
  background-color: #ecf4fe;
}

#about-content {
  background-color: #ecf4fe;
  width: 100%;
  text-align: left;
  padding: 1rem 1.2rem;
}
@media (min-width: 768px) {
  .wrapper {
    margin: 1rem 20%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-in,
.fade-leave-from {
  opacity: 1;
}
</style>
