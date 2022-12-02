<template>
  <div class="main-div">
    <div class="form ki_form">
      <h3>
        Получение информации по ФИО и региону
      </h3>
      <hr style="border: 1px solid #f5f5f5;" />
      <DxValidationGroup ref="validGroup">
        <div class="dx-fieldset">
          <div class="dx-field" style="display: flex">
            <div style="width: 70%">
              <div class="dx-field-label" style="width:20%">ФИО:</div>
              <div class="dx-field-value" style="width:80%">
                <DxTextBox
                  v-model="lname"
                  :value="lname"
                  :show-clear-button="true"
                  :hover-state-enabled="false"
                  placeholder="Введите фамилию, имя и отчество"
                >
                  <DxValidator>
                    <DxRequiredRule message="ФИО обязательны для заполнения" />
                  </DxValidator>
                </DxTextBox>
              </div>
            </div>
            <div style="width: 30%">
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

          <!-- <div class="dx-field">
          <div class="dx-field-label">Гриф секретности*:</div>
          <div class="dx-field-value">
            <DxSelectBox :search-enabled="true" :search-mode="'startswith'" :search-expr="'display'"
              :data-source="grifsecret" display-expr="display" value-expr="value" placeholder="Гриф секретности документа"
              v-model="ths.global.message.obj_attrs.AIUS_GRIF" :show-clear-button="true"
              hint="Укажите гриф секретности сообщения">
              <DxValidator>
                <DxRequiredRule message="Укажите гриф секретности!" />
              </DxValidator>
            </DxSelectBox>
          </div>
          <div class="dx-field-label" style="margin-left:2%">Категория срочности документа*:</div>
          <div class="dx-field-value">
            <DxSelectBox :search-enabled="true" :search-mode="'startswith'" :search-expr="'display'"
              :data-source="srochnost" display-expr="display" value-expr="value"
              placeholder="Категория срочности документа" v-model="ths.global.message.obj_attrs.AIUS_SROCHNOST"
              :show-clear-button="true" hint="Укажите категорию срочности документа">
              <DxValidator>
                <DxRequiredRule message="Укажите категорию срочности!" />
              </DxValidator>
            </DxSelectBox>
          </div>
        </div> -->
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
      <DxScrolling column-rendering-mode="virtual" />
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
  DxSearchPanel,
  DxScrolling
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
    DxScrolling,
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
