<template>
    <DxPopup
      ref="popupAccount"
      v-model="store.showAccount"
      :visible="store.showAccount"
      :drag-enabled="false"
      :hide-on-outside-click="true"
      :show-title="true"
      title="Профиль"
      @hiding="onHiding"
    >
      <DxScrollView width="100%" height="100%">
        
      </DxScrollView>
    </DxPopup>
  </template>
  
  <script>
  import DxPopup from "devextreme-vue/popup";
  import { DxScrollView } from 'devextreme-vue/scroll-view';
  import store from "../store";
  
  import {
    DxDataGrid,
    DxColumn,
    DxSorting,
    DxSearchPanel,
    DxMasterDetail
  } from "devextreme-vue/data-grid";
  
  export default {
    components: {
      DxPopup,
      DxDataGrid,
      DxColumn,
      DxSorting,
      DxSearchPanel,
      DxMasterDetail,
      DxScrollView
    },
    data() {
      return {
        store
      };
    },
    methods: {
      // closeOutside(e) {
      //   this.store.showPopUp = false;
      // },
      onHiding() {
        this.store.showAccount = false;
      },
      // contentReady(e) {
      //   if (!e.component.getSelectedRowKeys().length) {
      //     e.component.selectRowsByIndexes(0);
      //   }
      // },
      selectionChanged(e) {
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
      }
    }
  };
  </script>
  
  <style></style>
  