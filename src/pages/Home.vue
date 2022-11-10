<template>
  <div class="home-wrapper">
  </div>
</template>

<script>
  export default {
    data () {
      return { 
      }
    },
    created () {
    document.title = "Суды - Главная";
    this.$nextTick(() => {
      mainWrapper.style.height = document.documentElement.clientHeight - this.store.navHeight + 'px'
    })

  },
    methods:{

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-wrapper{
  min-height: 100vh;
}
</style>