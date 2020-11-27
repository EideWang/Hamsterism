<template>
  <div class="spinner">
    <div
      :class="[
        {
          'sk-fade-in': fadeIn === 'full' && !noFadeIn,
          'sk-fade-in-half-second': fadeIn === 'half' && !noFadeIn,
          'sk-fade-in-quarter-second': fadeIn === 'quarter' && !noFadeIn,
        },
        'sk-spinner',
        'sk-cube-grid',
      ]"
      :style="style"
    >
      <div :key="index" v-for="(_, index) in 9"></div>
    </div>
  </div>
</template>
<script>
//code from vue-spinkit package (partial)
export default {
  name: "sk-cube-grid",
  props: {
    color: {
      type: String,
      default: "#666666",
    },
    noFadeIn: {
      type: Boolean,
      default: false,
    },
    fadeIn: {
      type: String,
      default: "full",
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
  },
  computed: {
    style() {
      let color = this.color !== "" ? "color: " + this.color + ";" : "";
      let width = this.width !== "" ? "width: " + this.width + "px;" : "";
      let height = this.height !== "" ? "height: " + this.height + "px;" : "";
      return color + width + height;
    },
  },
};
</script>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 6rem 0;
}
.sk-spinner {
  color: #333;
}

.sk-spinner > div {
  background-color: currentColor;
}

.sk-cube-grid {
  width: 40px;
  height: 40px;
}

.sk-cube-grid > div {
  width: 33%;
  height: 33%;
  background-color: currentColor;
  float: left;

  -webkit-animation: sk-scaleDelay 1.3s infinite ease-in-out;
  animation: sk-scaleDelay 1.3s infinite ease-in-out;
}

/*
 * Spinner positions
 * 1 2 3
 * 4 5 6
 * 7 8 9
 */

.sk-cube-grid > div:nth-child(1) {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid > div:nth-child(2) {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid > div:nth-child(3) {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.sk-cube-grid > div:nth-child(4) {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid > div:nth-child(5) {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid > div:nth-child(6) {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid > div:nth-child(7) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.sk-cube-grid > div:nth-child(8) {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid > div:nth-child(9) {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-scaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-scaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>
