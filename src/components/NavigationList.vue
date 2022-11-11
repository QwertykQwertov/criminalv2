<template>
  <div
    :style="{width: leftWidth}"
    style=" background-color: rgb(76 57 31 / 70%); padding-top:10% height:100%;"
  >
    <div class="wrapper-list">
      <p class="list-item"><i class="dx-icon-group" />&nbsp&nbsp&nbsp{{$store.user.fname + ' ' + $store.user.lname}}</p>
    </div>
    <div class="wrapper-list">
      <p class="list-item"><i class="dx-icon-email" />&nbsp&nbsp&nbsp{{$store.user.email}}</p>
    </div>
    <div class="wrapper-list">
      <p class="list-item"><i class="dx-icon-money" />&nbsp&nbsp&nbsp{{'Баланс: ' + $store.user.balance + ' ₽'}}</p>
    </div>
    <div class="wrapper-list">
      <p class="list-item"><i class="dx-icon-add" />&nbsp&nbsp&nbspПополнить баланс</p>
    </div>
    <div @click="changeLocation('/cabinet')" class="wrapper-list">
      <p class="list-item"><i class="dx-icon-product" />&nbsp&nbsp&nbspВ кабинет</p>
    </div>
    <div class="wrapper-list">
      <p class="list-item"><i class="dx-icon-rename" />&nbsp&nbsp&nbspСменить пароль</p>
    </div>
    <div class="wrapper-list">
      <p class="list-item"><i class="dx-icon-info" />&nbsp&nbsp&nbspСообщить об ошибке</p>
    </div>
    <div
      @click="logout"
      class="wrapper-list"
    >
      <p class="list-item"><i class="dx-icon-runner" />&nbsp&nbsp&nbspВыйти</p>
    </div>
  </div>
</template>
<script>
import { DxList } from 'devextreme-vue/list';

export default {
  components: {
    DxList,
  },
  computed: {
    leftWidth () {
      return window.innerWidth * 0.25 + 'px'
    }
  },
  methods: {
    changeLocation (route) {
      if (this.$router.currentRoute.path != route) this.$router.push(route)      
      this.$emit('close')
    },
    logout () {
      this.$store.user = {}
      this.$store.authorization = false
      this.$router.push("/login")
      this.closeMenu()
    },
    closeMenu(){
      this.$emit('close')
    }
  }
};
</script>
<style scoped>
p {
  color: #fff;
  padding: 20px;
  font-size: 1.1rem;
}
p i {
  font-size: 1.5rem;
}
.wrapper-list {
  border-top: 1px solid #ddd;
  position: static;
  cursor: pointer;
  display: table;
  width: 100%;
  table-layout: fixed;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  outline: 0;
}
.wrapper-list:hover {
  background-color: #3d2e1b;
  transition: 0.4s linear;
}
.list-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: table-cell;
  width: 100%;
  top: 0;
  width: 100%;
  height: 100%;
  left: 0;
  z-index: 1000;
}
</style>
