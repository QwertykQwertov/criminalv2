<template>
  <div class="main-div">
    <div class="form ki_form">
      <h3>
        Получение информации по ФИО и региону
      </h3>
      <hr style="border: 1px solid #f5f5f5;" />
      <DxValidationGroup ref="validGroup">
        <div class="dx-fieldset">
          <div class="dx-field">
            <div class="dx-field-label">Фамилия:</div>
            <div class="dx-field-value">
              <DxTextBox
                v-model="lname"
                :value="lname"
                :show-clear-button="true"
                :hover-state-enabled="false"
                placeholder="Введите фамилию для запроса"
              >
                <DxValidator>
                  <DxRequiredRule message="Фамилия обязательна для заполнения" />
                </DxValidator>
              </DxTextBox>
            </div>
          </div>
          <div class="dx-field">
            <div class="dx-field-label">Имя:</div>
            <div class="dx-field-value">
              <DxTextBox
                v-model="fname"
                :value="fname"
                :show-clear-button="true"
                :hover-state-enabled="false"
                placeholder="Введите имя для запроса"
              >
                <DxValidator>
                  <DxRequiredRule message="Имя обязательно для заполнения" />
                </DxValidator>
              </DxTextBox>
            </div>
          </div>
          <div class="dx-field">
            <div class="dx-field-label">Отчество:</div>
            <div class="dx-field-value">
              <DxTextBox
                v-model="fatherName"
                :value="fatherName"
                :show-clear-button="true"
                :hover-state-enabled="false"
                placeholder="Введите отчество для запроса"
              >
                <DxValidator>
                  <DxRequiredRule message="Отчество обязательно для заполнения" />
                </DxValidator>
              </DxTextBox>
            </div>
          </div>
          <div class="dx-field">
            <div class="dx-field-label">Область:</div>
            <div class="dx-field-value">
              <DxSelectBox
                v-model="region"
                :search-enabled="true"
                :data-source="store.regions"
                noDataText="Совпадений не найдено"
                search-mode="contains"
                search-expr="area"
                display-expr="area"
                value-expr="tag"
                placeholder="Выберите область для поиска"
              >
                <DxValidator>
                  <DxRequiredRule message="Регион обязателен для заполнения" />
                </DxValidator>
              </DxSelectBox>
            </div>
          </div>
        </div>
        <div class="dx-fieldset">
          <DxValidationSummary
            ref="validatorSum"
            id="summary"
          />
          <DxButton
            id="button"
            :use-submit-behavior="true"
            text="Получить информацию"
            type="success"
            @click="handleSubmit($event)"
          />
        </div>
      </DxValidationGroup>
    </div>

    <DxDataGrid
      :height="500"
      ref="gridInfo"
      noDataText="Нет данных для отображения"
      :data-source="store.historyQueries"
      :row-alternation-enabled="true"
      :show-borders="true"
      :focused-row-enabled="true"
      style="margin: 5%"
      @rowDblClick="checkOnComplete($event)"
    >
      <DxColumn
        data-field="fio"
        caption="ФИО"
        data-type="string"
      />
      <DxColumn
        data-field="region"
        caption="Регион"
        data-type="string"
      />
      <DxColumn
        data-field="status"
        caption="Статус"
        data-type="string"
      />
      <DxSorting mode="multiple" />
    </DxDataGrid>
    <ModalGrid
      @closePopUp="closePopUp"
      :showPopUp="store.showPopUp"
      :selectQuery="store.selectQuery"
    />
    <DxToast
      :visible="isVisible"
      :message="message"
      :type="type"
    />
  </div>
</template>
<script>
import ModalGrid from "../components/ModalGrid.vue";
import store from "../store"

import DataSource from "devextreme/data/data_source";
import { DxToast } from "devextreme-vue/toast";
import {
  DxDataGrid,
  DxColumn,
  DxSorting,
  DxSearchPanel
} from "devextreme-vue/data-grid";
import {
  DxValidator,
  DxRequiredRule,
} from "devextreme-vue/validator";
import { DxSelectBox } from 'devextreme-vue/select-box';
import DxValidationGroup from 'devextreme-vue/validation-group';

export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxDataGrid,
    DxColumn,
    DxSorting,
    DxSearchPanel,
    DxToast,
    DxSelectBox,
    DxValidationGroup,
    ModalGrid
  },
  data () {
    return {
      store,
      fname: "",
      lname: "",
      fatherName: "",
      region: "",
      isVisible: false,
      message: "",
      type: "success"
    };
  },
  created () {
    fetch('http://94.228.115.6:5000/api/v1/courts_mapping')
      .then((response) => {
        return response.json();
      })
      .then(({ data }) => {
        this.store.regions = data
      });
    document.title = 'Суды - Кабинет'
    // this.$nextTick(() => {
    //   mainWrapper.style.height = this.store.navHeight
    // });
  },
  methods: {
    handleSubmit (e) {
      if (e.validationGroup.validate().isValid) {
        fetch(`http://94.228.115.6:5000/api/v1/collect?fio=${this.lname} ${this.fname} ${this.fatherName}&region=${this.region}`)
          .then((response) => {
            return response.json();
          })
          .then(async (data) => {
            let reportHistory = JSON.parse(localStorage.getItem('reportHistory'))
            if (reportHistory == null) {
              reportHistory = JSON.stringify([data])
              localStorage.setItem('reportHistory', reportHistory)
            } else {
              reportHistory.push(data)
              localStorage.setItem('reportHistory', JSON.stringify(reportHistory))
            }
            this.resetForm()
            await this.store.historyQueries.reload()
            this.getStatus()
          })
      }
    },
    checkOnComplete (e) {
      if (e.data.status === "Готов") {
        this.openPopUp(e.data.task_id)
      } else {
        this.isVisible = true;
        this.message = "Выбранный отчет еще не выполнен";
        this.type = "warning";
        setTimeout(() => { this.isVisible = false }, 3000)
      }
    },
    openPopUp (task_id) {
      fetch(`http://94.228.115.6:5000/api/v1/result?id=${task_id}`)
        .then((response) => {
          return response.json();
        })
        .then(({ data }) => {
          this.store.selectQuery = new DataSource({
            key: "id",
            load () {
              return data;
            }
          });
          this.store.selectQuery.reload()
          this.store.showPopUp = true;
        })
    },
    closePopUp () {
      this.store.showPopUp = false
    },
    getStatus () {
      if (this.store.historyQueries._items.some(el => el.status != "Готов")) {
        this.store.historyQueries.reload()
        setTimeout(this.getStatus, 3000)
      }
    },
    resetForm () {
      this.$nextTick(() => {
        this.$refs.validGroup.$_instance.reset()
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-div {
  display: flex;
  justify-content: space-around;
  padding-top: 5%;
  align-items: flex-start;
  flex-wrap: wrap;
}
.ki_form {
  width: 60% !important;
  border: 8px solid #f5f5f5;
  background: rgb(255 255 255 / 60%);
  text-align: center;
}
/* #443837  #483218 */
</style>
