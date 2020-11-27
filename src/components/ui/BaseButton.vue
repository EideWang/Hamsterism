<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  border-radius: 4px;
  background: #fcf0e2;
  border: none;
  border-bottom: 4px solid #f3d2ad;
  display: inline-block;
  position: relative;
  margin: 0.3rem;
  padding: 4px 8px 0 8px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  font-family: "Hind", sans-serif;
}

.btn:active,
.btn:focus {
  background: #fce0c1;
  border-bottom: 4px solid #c9aa87;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  outline: none;
}
</style>
