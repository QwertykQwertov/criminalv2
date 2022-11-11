<template>
  <div id="mainWrapper" >
  </div>
</template>

<script>
  export default {
    created () {
    document.title = "Суды - Главная";
    this.$nextTick(() => {
      mainWrapper.style.height = this.$store.navHeight
    })
  },
  }
</script>