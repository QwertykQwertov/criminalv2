<template>
  <div id="mainWrapper" >
  </div>
</template>

<script>
import store from "../store"
  export default {
    data(){
      return{
        store
      }
    },
    created () {
    document.title = "Суды - Главная";
    this.$nextTick(() => {
      mainWrapper.style.height = this.store.navHeight
    })
  },
  }
</script>