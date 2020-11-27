<template>
  <div class="wrapper">
    <div id="filter"></div>
    <div id="welcome" class="unselectable">
      <h1 class="mb-0">{{ animatedText }}<span id="caret">&nbsp;</span></h1>
    </div>
    <div id="hamsterCarousel">
      <div class="carousel-img"></div>
      <div class="carousel-img"></div>
      <div class="carousel-img"></div>
      <div class="carousel-img"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sloganText: "Welcome to Hamsterism, Eide's Blog!",
      animatedText: "",
      i: 0,
    };
  },
  watch: {
    animatedText(newV) {
      if (newV === this.sloganText) {
        setTimeout(() => {
          //注意這裡必須使用arrow function才能讓this被正確指向
          this.i = 0;
          this.animatedText = "";
          this.typeWriter();
        }, 10000);
      }
    },
  },
  created() {
    setTimeout(() => this.typeWriter(), 2000);
  },
  methods: {
    typeWriter() {
      const speed = 100;
      if (this.i < this.sloganText.length) {
        this.animatedText += this.sloganText.charAt(this.i);
        this.i++;
        setTimeout(this.typeWriter, speed);
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  overflow: hidden;
}
#filter {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #000000;
  opacity: 0.5;
  width: 100%;
  height: 100vh;
}
#welcome {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 110;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
  color: #fcf0e2;
}
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#hamsterCarousel {
  width: 100%;
}
.carousel-img {
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 3.5rem;
  left: 0;
  width: 100%;
  height: calc(100vh - 3.5rem);
  visibility: hidden;
  opacity: 0;
  animation: slider 44s linear infinite;
}
#hamsterCarousel > div:nth-child(1) {
  background-image: url("../assets/img/hamster01.jpg");
  animation-delay: 0s;
}
#hamsterCarousel > div:nth-child(2) {
  background-image: url("../assets/img/hamster02.jpg");
  animation-delay: 11s;
}
#hamsterCarousel > div:nth-child(3) {
  background-image: url("../assets/img/hamster03.jpg");
  animation-delay: 22s;
}
#hamsterCarousel > div:nth-child(4) {
  background-image: url("../assets/img/hamster04.jpg");
  animation-delay: 33s;
}

@keyframes slider {
  0% {
    visibility: hidden;
    opacity: 0;
  }
  2.272727% {
    visibility: visible;
    opacity: 1;
  }

  25% {
    visibility: visible;
    opacity: 1;
  }
  27.272727%,
  100% {
    visibility: hidden;
    opacity: 0;
  }
}

#caret {
  border-left: 5px solid orange;
  margin-left: 3px;
  animation: blink-caret 1s infinite;
}

@keyframes blink-caret {
  from {
    border-color: transparent;
  }
  to {
    border-color: orange;
  }
}
</style>
