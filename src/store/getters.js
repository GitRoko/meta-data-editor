const getters = {
  getFiles(state) {
    return state.files;
  },
  getRootFieldItem: (state) => (path) => {
    const itemPathArray = path.split(":");
    const item = state.preparedData.find(
      (item) => item.rowId === itemPathArray[0]
    );
    return item;
  },
  getIndexRootFieldItem: (state) => (id) => {
    return state.preparedData.findIndex((item) => item.rowId === id);
  },
  getCurrentFileData(state) {
    return state.currentFileData;
  },
  getCurrentFile(state) {
    return state.currentFile;
  },
  getCurrentFileName(state) {
    if (state.currentFile) {
      return state.currentFile.fileName;
    }
    return null;
  },
  getCurrentFileHadler(state) {
    if (state.currentFile) {
      return state.currentFile.fileHandle;
    }
    return null;
  },
  getCurrentItem: (state) => (id) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    const ids = id.split(":");
    if (ids.length === 1) {
      return state.preparedData.find((row) => row.rowId === id);
    }
    let currentRow = {};
    let rows = state.preparedData;
    ids.forEach((idIds) => {
      currentRow = rows.find((row) => row.rowId === idIds);

      if (currentRow.object) {
        rows = currentRow.object;
      } else if (currentRow.array) {
        rows = [currentRow.array];
      } else if (currentRow.faker) {
        rows = [currentRow.faker];
      } else {
        rows = {};
      }
    });

    return currentRow;
  },
  getCurrentFakerItem: (state) => (id) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    const ids = id.split(":");
    if (ids.length === 1) {
      return state.preparedData.find((row) => row.rowId === id);
    }
    let currentRow = {};
    let rows = state.preparedData;
    ids.forEach((idIds) => {
      currentRow = rows.find((row) => row.rowId === idIds);

      if (currentRow.faker) {
        rows = [currentRow.faker];
      } else {
        rows = {};
      }
      
    });

    return currentRow;
  },
  getCurrentFileDirHandler(state) {
    if (state.currentFile) {
      return state.currentFile.dirHandle;
    }
    return null;
  },
  getDataJson(state) {
    return state.dataJson;
  },
  getPreparedData(state) {
    return state.preparedData;
  },
  getChangedDataTable(state) {
    return state.changedDataTable;
  },
  getTitle(state) {
    return state.title;
  },
  getForeignData(state) {
    return state.foreignData;
  },
};

export default getters;
