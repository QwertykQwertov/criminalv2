<template>
  <div class="about">
    <h1>This is page about us</h1>
    <h2>{{msg}}</h2>
  </div>
</template>
  
  <script>
export default {
  data () {
    return {
      msg: 'artydev & co'
    }
  }, created () {
    document.title = 'Суды - О проекте'
  },
}
  </script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.about {
  height: 80vh;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>