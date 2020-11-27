<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <div class="closeBtn">
          <i class="fas fa-times closeBtn" @click="tryClose"></i>
        </div>
        <div>
          <header>
            <h2>
              <slot name="header">
                {{ title }}
              </slot>
            </h2>
          </header>
          <section>
            <p>
              <slot name="message">
                {{ message }}
              </slot>
            </p>
          </section>
          <div class="actions">
            <slot name="actions">
              <base-button @click="tryClose">Cancel</base-button>
            </slot>
          </div>
        </div>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: "Dialog Title Demo",
    },
    message: {
      type: String,
      required: false,
      default: "Dialog Description Demo",
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.closeBtn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0.6;
  z-index: 1000;
  font-size: 1.6rem;
  cursor: pointer;
}
.closeBtn:hover {
  opacity: 1;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: #000000;
  z-index: 2000; /*因為bootstrap navbar 的fix-top的z-index是1030*/
  opacity: 0.5;
}

dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 2001;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}

header {
  background-color: #76c2f7;
  color: white;
  width: 100%;
  padding: 0.5rem 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

.actions {
  padding: 0 1rem 0.8rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.dialog-enter-active {
  transition: all 0.1s ease-out;
}
.dialog-leave-active {
  transition: all 0.1s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>
