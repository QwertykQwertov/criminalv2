<template>
  <div id="app">
    <Header
      ref="nav"
      @toggleMenu="toggleLeftMenu"
      @closeMenu="closeLeftMenu"
    />
    <DxDrawer
      ref="leftMenu"
      opened-state-mode="overlap"
      position="right"
      reveal-mode="slide"
      :close-on-outside-click="true"
      template="listMenu"
    >
      <template #listMenu>
        <NavigationList @close="closeLeftMenu" />
      </template>

      <div id="content">
        <DxScrollView
          id="scrollview"
          ref="scrollViewWidget"
          :scroll-by-content="true"
          :scroll-by-thumb="true"
          show-scrollbar="onScroll"
        >
          <div class="text-content">
            <router-view />
            <Footer />
          </div>
        </DxScrollView>

      </div>
    </DxDrawer>
  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import DxDrawer from "devextreme-vue/drawer"
import NavigationList from "./components/NavigationList.vue"

import { DxScrollView } from 'devextreme-vue/scroll-view';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    DxDrawer,
    DxScrollView,
    NavigationList
  },
  created () {
    this.$nextTick(() => {
      this.$store.navHeight = document.documentElement.clientHeight - this.$refs.nav.$el.offsetHeight + 'px'
      app.querySelector('.dx-drawer').style.height = this.$store.navHeight
      scrollview.style.height = this.$store.navHeight
      app.querySelector('.dx-overlay-wrapper').style.height = this.$store.navHeight
    })
  },
  methods: {
    toggleLeftMenu () {
      this.$refs.leftMenu.$_instance.toggle()
    },
    closeLeftMenu () {
      this.$refs.leftMenu.$_instance.hide()
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */

  /* /* height: auto; */
  /* min-height: 100vh;  */
  /* height: 100vh; */
  background: linear-gradient(rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.8)),
    url(./assets/femida_compress.jpg);
  background-position: top;
  background-size: 100%;
}
.ki_form h3 {
  color: rgb(94 94 94);
  font-family: "Helvetica Neue", "Segoe UI", helvetica, verdana, sans-serif;
}
.dx-drawer-overlap.dx-drawer-left .dx-drawer-wrapper, .dx-drawer-overlap.dx-drawer-right .dx-drawer-wrapper {
    /* overflow-y: hidden; */
}
</style>
