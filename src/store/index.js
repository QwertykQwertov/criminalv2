import DataSource from "devextreme/data/data_source";

const store = {
  navHeight: "100vh",
  showPopUp: false,
  authorization: false,
  user: {},
  regions: [],
   historyQueries:
    new DataSource({
      key: "task_id",
      load () {
        const reportHistory = JSON.parse(localStorage.getItem('reportHistory'))
        return reportHistory || []
      }
    }),
  selectQuery: [],
};
export default store;
