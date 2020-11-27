<template>
  <h1>Hamsterism</h1>
  <p>
    &nbsp;&nbsp;&nbsp;&nbsp;This is Eide's personal blog as the first step to become a front-end web
    developer. I write some notes to record code-learning, thoughts and life. It's constructed by
    Vue3. Actually some components or functions are simplified, and there is lack of some functions
    like message board, Tags, optimization of loading, SEO... I'll keep updating these with
    increasing of programming knowledge. Welcome to exchange thoughts and discuss!!
  </p>
  <div class="separate-line"></div>
  <h4>Languages & Tech Used</h4>
  <div class="wrapper">
    <ul>
      IDE: Visual Studio Code
    </ul>
    <ul>
      Language:
      <span>HTML</span
      >,
      <span>CSS</span
      >,
      <span>Javascript</span>
    </ul>
    <ul>
      Front-end Framework: Vue 3
    </ul>
    <ul>
      Back-end and Database: Firebase/Realtime Database
    </ul>
    <ul>
      Key Packages:&nbsp;<span v-for="item in keyPackages" :key="item.name">
        <a :href="item.link" class="tag" target="_blank">{{ item.name }}</a>
      </span>
    </ul>
    <ul>
      Other Resources:&nbsp;<span v-for="item in otherResources" :key="item.name">
        <a :href="item.link" class="tag" target="_blank">{{ item.name }}</a>
      </span>
    </ul>
    <ul>
      Domain Name: purchased from NameCheap
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyPackages: [
        { name: "vuex", link: "https://vuex.vuejs.org/guide/" },
        { name: "vue-router", link: "https://next.router.vuejs.org/guide/#html" },
        { name: "firebase", link: "https://firebase.google.com/docs/database/web/start" },
        { name: "highlight.js", link: "https://highlightjs.org/" },
        { name: "vue3-editor", link: "https://www.npmjs.com/package/vue3-editor?activeTab=readme" },
        { name: "jquery", link: "https://jquery.com/" },
        { name: "lodash", link: "https://lodash.com/" },
      ],
      otherResources: [
        {
          name: "Bootstrap 4",
          link: "https://getbootstrap.com/docs/4.5/getting-started/introduction/",
        },
        { name: "Font Awesome", link: "https://fontawesome.com/" },
        { name: "Google Font", link: "https://fonts.google.com/" },
        { name: "Unsplash", link: "https://unsplash.com/" },
      ],
    };
  },
};
</script>
<style scoped>
h1 {
  margin: 0;
}
p {
  font-size: 1.2rem;
  margin: 0;
  text-align: justify;
}
.wrapper {
  margin-bottom: 1.2rem;
}
ul {
  padding-left: 1rem;
  font-size: 1.2rem;
  margin: 0.5rem 0;
}
.separate-line {
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
.tag {
  background-color: #3a495f;
  color: #ecf4fe;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0 6px;
  margin-right: 0.5rem;
  display: inline-block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
