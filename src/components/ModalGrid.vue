<template>
  <DxPopup
    ref="popup"
    v-model="$store.showPopUp"
    :visible="$store.showPopUp"
    :drag-enabled="false"
    :hide-on-outside-click="true"
    :show-title="true"
    title="Судебные дела"
    @hiding="onHiding"
  >
    <DxScrollView
      width="100%"
      height="100%"
    >
      <DxDataGrid
        ref="grid"
        :data-source="$store.selectQuery"
        :row-alternation-enabled="true"
        :show-borders="true"
        :focused-row-enabled="true"
        @selection-changed="selectionChanged"
      >
        <DxColumn
          data-field="case_number"
          caption="№ дела"
          data-type="string"
        />
        <DxColumn
          data-field="receipt_dt"
          caption="Дата поступления"
          data-type="date"
          format="dd.MM.yyyy"
        />
        <DxColumn
          data-field="applicant"
          caption="Истец"
          data-type="string"
        />
        <DxColumn
          data-field="defendant"
          caption="Ответчик"
          data-type="string"
        />
        <DxColumn
          data-field="judge"
          caption="Судья"
          data-type="string"
        />
        <DxColumn
          data-field="solution"
          caption="Результат"
          data-type="string"
        />

        <DxMasterDetail
          :enabled="true"
          template="detailTemplate"
        />
        <template #detailTemplate="{ data: report }">
          <div class="detail-wrapper">
            <p><b>№ дела:</b> {{ report.data.case_number }}</p>
            <p><b>Дата поступления:</b> {{ formatDate(report.data.receipt_dt)}}</p>
            <p><b>Истец:</b> {{ report.data.applicant }}</p>
            <p><b>Ответичк:</b> {{ report.data.defendant }}</p>
            <p><b>Судья:</b> {{ report.data.judge }}</p>
            <p><b>Дата решения:</b> {{ formatDate(report.data.decision_dt) }}</p>
            <p><b>Результат:</b> {{ report.data.solution }}</p>
            <p><b>Дата вступления в законную силу:</b> {{ formatDate(report.data.entry_dt) }}</p>
          </div>
        </template>
        <DxSorting mode="multiple" />
      </DxDataGrid>
    </DxScrollView>
  </DxPopup>
</template>

<script>
import DxPopup from "devextreme-vue/popup";
import { DxScrollView } from "devextreme-vue/scroll-view";
import { exportDataGrid } from "devextreme/pdf_exporter";
import { font } from "../assets/fonts/utcFontForExportPDF";

import {
  DxDataGrid,
  DxColumn,
  DxSorting,
  DxSearchPanel,
  DxMasterDetail,
  DxExport
} from "devextreme-vue/data-grid";

export default {
  components: {
    DxPopup,
    DxDataGrid,
    DxColumn,
    DxSorting,
    DxSearchPanel,
    DxMasterDetail,
    DxScrollView,
    DxExport
  },
  data () {
    return {
      // font
    };
  },
  created () {
    // this.$nextTick(()=> console.log(font))
  },
  methods: {
    formatDate (date) {
      if (date) {
        date = date.slice(0, 10)
        return date.split("-").reverse().join(".")
      }
      return ""
    },
    // closeOutside(e) {
    //   this.$store.showPopUp = false;
    // },
    onHiding () {
      this.$store.showPopUp = false;
    },
    // contentReady(e) {
    //   if (!e.component.getSelectedRowKeys().length) {
    //     e.component.selectRowsByIndexes(0);
    //   }
    // },
    selectionChanged (e) {
      e.component.collapseAll(-1);
      e.component.expandRow(e.currentSelectedRowKeys[0]);
    },
    // onExporting (e) {
    //   const doc = new jsPDF();

    //   doc.addFileToVFS("PTSans-Regular-normal.ttf", font);
    //   doc.addFont("PTSans-Regular-normal.ttf", "PTSans-Regular", "normal");
    //   doc.setFont("PTSans-Regular")
    //   exportDataGrid({
    //     jsPDFDocument: doc,
    //     component: e.component,
    //     indent: 5
    //   }).then(() => {
    //     doc.save("Companies.pdf");
    //   });
    // }
  }
};
</script>

<style scoped>
.detail-wrapper p {
  white-space: normal;
}
.dx-datagrid-nowrap,
.dx-datagrid-nowrap .dx-header-row > td {
  white-space: normal !important;
}
</style>
