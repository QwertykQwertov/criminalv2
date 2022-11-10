import DataSource from "devextreme/data/data_source";

const store = {
  navHeight: null,
  showPopUp: false,
  authorization: false,
  user: {},
  regions: [],
  // [{id:1, name: "Калужская область", value: "klg"},{id:2, name: "Московская область", value: "msk"},{id:3, name: "Ивановская область", value: "ivn"},{id:4, name: "Кемеровская область", value: "kem"}],
  historyQueries:
    new DataSource({
      key: "task_id",
      load () {
        const reportHistory = JSON.parse(localStorage.getItem('reportHistory'))
        return reportHistory || []
      }
      // key: "id",
      // load () {
      //   return fetch('https://636916d028cd16bba714a6fd.mockapi.io/api/v1/reports')
      //     .then((response) => {
      //       return response.json();
      //     })
      //     .then((data) => {
      //       return data
      //     });
      // }
    }),
  selectQuery: [],
};
export default store;
