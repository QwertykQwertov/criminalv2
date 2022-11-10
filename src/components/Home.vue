<template>
  <div>
    <div
      class="row"
      style="margin-top: 20%"
    >
      <div class="col s4 offset-s8">
        <DxButton
        :height="50"
          :width="200"
          id="btnStart"
          icon="find"
          text="Начать"
          type="default"
        />
      </div>
    </div>

  </div>
</template>

<script>
import DxButton from "devextreme-vue/button"
export default {
  components: {
    DxButton,
  },
  data () {
    return {
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "materialize-css/dist/css/materialize.min.css";
#btnStart {
  /* margin-left: auto;
  margin-right: 10%;
  margin-top: 20%; */
}
</style>