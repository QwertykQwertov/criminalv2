<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <a
          @click="changeLocation('/')"
          class="brand-logo"
        ><i class="large material-icons">account_balance</i>Сервис проверки
          судимостей</a>
        <a
          href="#"
          data-target="mobile-demo"
          class="sidenav-trigger"
        ><i class="material-icons">menu</i></a>
        <ul
          id="nav-mobile"
          class="right hide-on-med-and-down"
        >
          <li>
            <a @click="changeLocation('/policy')">Политика конфиденциальности</a>
          </li>
          <template v-if="store.authorization">
            <li><a @click="showAccount">Профиль</a></li>
            <li><a @click="changeLocation('/cabinet')">Кабинет</a></li>
          </template>
          <template v-else>
            <li><a @click="changeLocation('/login')">Войти</a></li>
            <li><a @click="changeLocation('/register')">Регистрация</a></li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- Mobile menu -->  
    <ul
      ref="mobile-menu"
      class="sidenav sidenav-mobile"
      id="mobile-demo"
    >
      <li>
        <a
          @click="changeLocation('/policy')"
          class="sidenav-close"
        >Политика конфиденциальности</a>
      </li>
      <li><a
          @click="changeLocation('/login')"
          class="sidenav-close"
        >Войти</a></li>
      <li><a
          @click="changeLocation('/register')"
          class="sidenav-close"
        >Регистрация</a></li>
    </ul>
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
  methods: {
    showAccount () {
      this.$emit('toggleMenu')
    },
    changeLocation (route) {
      if (this.$router.currentRoute.path != route) this.$router.push(route)
      this.$emit('closeMenu')
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.navbar-fixed {
  z-index: 1505 !important;
}
.brand-logo {
  cursor: pointer !important;
}
a {
  transition: 0.5s linear !important;
}
a:hover {
  color: #c2783b !important;
  transition: 0.3s linear !important;
}
.nav-wrapper .brand-logo {
  font-size: 1.5rem !important;
}
.nav-wrapper {
  background: linear-gradient(to right, #50381a, #141111) !important;
}
.sidenav-mobile {
  padding-top: 5% !important;
  background-color: rgb(86 61 20 / 74%) !important;
}
.sidenav-mobile a {
  color: #fff !important;
}

/* #443837  #483218 */
</style>
<style scoped src="materialize-css/dist/css/materialize.min.css">
/* @import "materialize-css/dist/css/materialize.min.css"; */
</style>
