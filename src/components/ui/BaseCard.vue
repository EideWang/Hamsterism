<template>
  <div id="card">
    <slot></slot>
  </div>
</template>

<style scoped>
#card {
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(236, 244, 254, 0.3);
  padding: 1rem;
  margin: 0 auto 2rem auto;
  max-width: 40rem;
  background-color: #ecf4fe;
}
</style>
