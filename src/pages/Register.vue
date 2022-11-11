<template>
  <div id="mainWrapper">
    <div class="form-wrapper">
      <div class="form ki-form">
        <h3 style='color:rgb(94 94 94);    font-family: "Helvetica Neue","Segoe UI",helvetica,verdana,sans-serif;'>
          Регистрация
        </h3>
        <hr style="border: 1px solid #f5f5f5;" />
        <div class="dx-fieldset">
          <div class="dx-field">
            <div class="dx-field-label">Имя:</div>
            <div class="dx-field-value">
              <DxTextBox
                v-model="name"
                :value="name"
                :show-clear-button="true"
                placeholder="Введите имя"
              />
            </div>
          </div>
          <div class="dx-field">
            <div class="dx-field-label">Фамилия:</div>
            <div class="dx-field-value">
              <DxTextBox
                v-model="last_name"
                :value="last_name"
                :show-clear-button="true"
                placeholder="Введите фамилию"
              />
            </div>
          </div>
          <div class="dx-field">
            <div class="dx-field-label">Почта:</div>
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
                  <DxAsyncRule
                    :validation-callback="asyncValidation"
                    message="Email is already registered"
                  />
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
          <div class="dx-field">
            <div class="dx-field-label">Повторите пароль:</div>
            <div class="dx-field-value">
              <DxTextBox
                :show-clear-button="true"
                mode="password"
                placeholder="Введите пароль еще раз"
              >
                <DxValidator>
                  <DxRequiredRule message="Пароли не совпадают" />
                  <DxCompareRule
                    :comparison-target="passwordComparison"
                    message="Пароли не совпадают!"
                  />
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
            @click="validation($event)"
          />
          <p style="    color: #333;
    font-weight: 400;
    font-size: 14px;">Нажимая кнопку "Продолжить" вы соглашаетесь с <a
              class="a-policy"
              @click="$router.push('/policy')"
            >политикой конфиденциальности</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxAsyncRule
} from "devextreme-vue/validator";

// Заглушка на email
const sendRequest = function (value) {
  const invalidEmail = "test@dx-email.com";
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value !== invalidEmail);
    }, 1000);
  });
};

export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxAsyncRule,
  },
  props: ["nextUrl"],
  data () {
    return {
      name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      is_admin: null
    };
  },
  created () {
    document.title = "Суды - Регистрация";
    this.$nextTick(() => {
      mainWrapper.style.height = this.$store.navHeight
    })
  },
  methods: {
    passwordComparison () {
      return this.password;
    },
    validation (e) {
      console.log(e);
    },
    asyncValidation (params) {
      return sendRequest(params.value);
    },
    // handleSubmit (e) {
    //   e.preventDefault();

    //   if (
    //     this.password === this.password_confirmation &&
    //     this.password.length > 0
    //   ) {
    //     let url = "http://localhost:3000/register";
    //     if (this.is_admin != null || this.is_admin == 1)
    //       url = "http://localhost:3000/register-admin";
    //     this.$http
    //       .post(url, {
    //         name: this.name,
    //         email: this.email,
    //         password: this.password,
    //         is_admin: this.is_admin
    //       })
    //       .then(response => {
    //         localStorage.setItem("user", JSON.stringify(response.data.user));
    //         localStorage.setItem("jwt", response.data.token);

    //         if (localStorage.getItem("jwt") != null) {
    //           this.$emit("loggedIn");
    //           if (this.$route.params.nextUrl != null) {
    //             this.$router.push(this.$route.params.nextUrl);
    //           } else {
    //             this.$router.push("/");
    //           }
    //         }
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //   } else {
    //     this.password = "";
    //     this.passwordConfirm = "";

    //     return alert("Passwords do not match");
    //   }
    // }
  }
};
</script>

<style scoped>
#summary {
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}
​ #button {
  display: block;
}
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
.a-policy {
  text-decoration: underline;
  box-sizing: border-box;
}
.a-policy:hover {
  color: #666;
}
</style>
