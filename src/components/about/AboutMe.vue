<template>
  <div id="header" class="justify-content-between align-items-end">
    <h1 id="name">Eide Wang</h1>
    <p id="email"><i id="google-icon" class="fab fa-google fa-sm"></i>zun620@gmail.com</p>
  </div>
  <h3><i>"A Hamster Lover, Newcomer in Front-end Web Development"</i></h3>
  <div class="separate-line"></div>
  <div>
    <h4>Why Start Coding?</h4>
    <div class="wrapper">
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;Not having CS background, I earned my master's degree in
        bioenvironmental systems engineering. And my first job is 'Project Manager'. Something
        weird...? Well, uhmm...life is unpredictable, isn't it? There's a story behind this hamster
        lovers, but I don't think anyone is interested in a room keeper. Maybe I will write it down
        after being a <del>true man</del> senior programmer one day :) &nbsp;&nbsp;In a nutshell,
        I've quit my job and been resolved to become a front-end web developer!!!
      </p>
    </div>
    <h4>Skill</h4>
    <div class="wrapper">
      <ul>
        Master: Petting Hamster
      </ul>
      <ul>
        Primary: HTML, CSS, Javascript ES6, Vue3, Sass, Bootstrap4, Git
      </ul>
      <ul>
        Secondary: Node.js, MongoDB
      </ul>
    </div>
    <h4>Job Experience</h4>
    <div class="wrapper">
      <ul>
        2019.9-2020.8&nbsp;&nbsp;Project Manager in AnaSystem, Inc.
      </ul>
      <ul>
        2020.9-2020.11&nbsp;&nbsp;Self Study Coding on Udemy
      </ul>
      <ul>
        2020.12~&nbsp;&nbsp;<span class="highlight-red"
          >Looking for a Front-end Web Developer Position!</span
        >
      </ul>
    </div>
    <h4>Interests</h4>
    <div class="wrapper">
      <p>Petting Hamsters, Japanese Animation, Trading and Market Trend, New Technology</p>
    </div>

    <h4>Personal Recommendation</h4>
    <div class="wrapper">
      <ul>
        Pet: Hamster
      </ul>
      <ul>
        Light Novel: ダンジョンに出会いを求めるのは間違っているだろうか(大森 藤ノ)
      </ul>
      <ul>
        Vtuber: Usada Pekora(兎田ぺこら)
      </ul>
      <ul>
        Singer: Hua Chen Yu(華晨宇)
      </ul>
    </div>
  </div>
</template>

<style scoped>
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
h4 {
  margin: 0.5rem 0;
}
p {
  font-size: 1.2rem;
  margin: 0;
  text-align: justify;
}
ul {
  padding-left: 1rem;
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.wrapper {
  margin-bottom: 1.2rem;
}
#header {
  margin-bottom: 0.5rem;
}
h1 {
  margin: 0;
}
#name {
  display: inline-block;
}
#email {
  margin-bottom: 5px;
}
#google-icon {
  margin-right: 3px;
}
.highlight-red {
  color: #e05157;
  font-weight: 600;
}

@media (min-width: 576px) {
  #header {
    display: flex;
  }
}
</style>
