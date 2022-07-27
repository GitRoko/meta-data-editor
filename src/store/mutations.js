const mutations = {
  updateFiles(state, files) {
    state.files = files;
  },
  updateCurrentFile(state, file) {
    state.currentFile = file;
  },
  updateCurrentFileData(state, data) {
    state.currentFileData = data;
  },
  updateTitle(state, data) {
    state.title = data;
  },
  updateDataJson(state, data) {
    state.dataJson = data;
  },
  updatePreparedDataTable(state, data) {
    state.preparedDataTable = data;
  },
  updateChangedDataTable(state, data) {
    state.changedDataTable = data;
  },
  updateForeignData(state, data) {
    state.foreignData = data;
  },
};

export default mutations;
