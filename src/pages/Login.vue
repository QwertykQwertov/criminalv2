<template>
  <div id="mainWrapper">
    <div class="form-wrapper">
      <div class="form ki-form">
        <h3>
          Вход
        </h3>
        <hr style="border: 1px solid #f5f5f5;" />
        <div class="dx-fieldset">
          <div class="dx-field">
            <div class="dx-field-label">Логин:</div>
            <div class="dx-field-value">
              <DxTextBox
                v-model="email"
                :value="email"
                mode="email"
                :show-clear-button="true"
                :hover-state-enabled="false"
                placeholder="Введите email"
              >
                <DxValidator>
                  <DxRequiredRule message="Email обязателен для заполнения" />
                  <DxEmailRule message="Некорректный Email!" />
                </DxValidator>
              </DxTextBox>
            </div>
          </div>
          <div class="dx-field">
            <div class="dx-field-label">Пароль:</div>
            <div class="dx-field-value">
              <DxTextBox
                v-model="password"
                :value="password"
                :show-clear-button="true"
                mode="password"
                placeholder="Введите пароль"
              >
                <DxValidator>
                  <DxRequiredRule message="Пароль не заполнен" />
                </DxValidator>
              </DxTextBox>
            </div>
          </div>
        </div>
        <div class="dx-fieldset">
          <DxValidationSummary id="summary" />
          <DxButton
            id="button"
            :use-submit-behavior="true"
            text="Продолжить"
            type="success"
            @click="handleSubmit($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxValidator,
  DxRequiredRule,
  DxEmailRule,
} from "devextreme-vue/validator";

export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxEmailRule,
  },
  name: "Header",
  data () {
    return {
      email: "",
      password: "",
    };
  },
  created () {
    document.title = "Суды - Вход";
    this.$nextTick(() => {
      mainWrapper.style.height = this.$store.navHeight
    })

  },
  methods: {
    handleSubmit (e) {
      if (e.validationGroup.validate().isValid) {
        fetch('https://636916d028cd16bba714a6fd.mockapi.io/api/v1/users')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            data.forEach(element => {
              if (element.email == this.email && element.password == this.password) {
                this.$store.authorization = true
                this.$store.user = element
                if (this.$router.currentRoute.path != '/cabinet') this.$router.push('/cabinet')
                // dxToast
              }
            });
          });
      }
    }
  }
};
</script>
<style scoped>
.ki-form {
  width: 60% !important;
  border: 8px solid #f5f5f5;
  background: rgb(255 255 255 / 60%);
  text-align: center;
}
.form-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 5%;
}
/* #443837  #483218 */
</style>
