<template>
  <div class="align-left wrapper">
    <h2>{{ title }}</h2>
    <div>
      <span id="classification"
        ><strong>#{{ classification }}</strong></span
      >
      <span id="date"
        >last updated on <strong>{{ createdDate }}</strong></span
      >
    </div>
    <pre id="description">
      {{ description }}<router-link id="read-more" :to="'/notes/' + noteId">read more...</router-link>
    </pre>
  </div>
</template>
<script>
export default {
  props: ["title", "description", "classification", "createdDate", "noteId"],
};
</script>
<style scoped>
pre::selection,
h2::selection,
strong::selection,
span::selection {
  background: #fcf0e2;
  color: #0b67f1;
}
.align-left {
  text-align: left;
}
.wrapper {
  margin: 1rem 0;
  border-left: 4px solid rgba(224, 81, 87, 0.5);
  padding: 0 0 0 2rem;
}
.wrapper:hover {
  border-left: 4px solid rgba(224, 81, 87, 1);
}

#classification {
  color: #76c2f7;
}

#read-more {
  color: #76c2f7;
  cursor: pointer;
}
#read-more:hover,
#read-more:active {
  color: #1b9bf7;
}
#date,
#read-more {
  display: block;
}

#description {
  font-size: 1rem;
  margin: 0;
  font-family: "Hind", sans-serif;
  overflow: hidden;
  white-space: pre-line;
}
@media (min-width: 576px) {
  #date,
  #read-more {
    float: right;
  }
}
</style>
