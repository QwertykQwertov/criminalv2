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
        let reportHistory = JSON.parse(localStorage.getItem('reportHistory'))
        if (reportHistory) {
          // return reportHistory =
          let test = reportHistory.map(el => {
            return fetch(`http://94.228.115.6:5000/api/v1/check?id=${el.task_id}`)
              .then((response) => {
                return response.json();
              })
              .then(({ data }) => {
                if (data.every(element => element.status === "SUCCESS")) {
                  el.status = "Готов"
                  return el
                } else {
                  el.status = "Проверяется"
                  return el
                }
              });
          })
          return Promise.all(test).then(res => res)
          
        }
        return []
      }
    }),
  selectQuery: [],
};
export default store;
