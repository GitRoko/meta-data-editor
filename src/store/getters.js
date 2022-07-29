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
  getCurrentFile(state) {
    return state.currentFile;
  },
  getCurrentItem: (state) => (path) => {
    // eslint-disable-next-line no-debugger
    // debugger;
    const ids = path.split(":");
    if (ids.length === 1) {
      return state.preparedData.find((row) => row.rowId === ids[0]);
    }
    
    let currentRow = {};
    let rows = state.preparedData;

    for (let i = 0; i < ids.length; i++) {
      currentRow = rows.find((row) => row.rowId === ids[i]);
      if (
        currentRow.faker !== undefined &&
        currentRow.faker.rowId === ids[i + 1]
      ) {
        rows = [currentRow.faker];
      } else if (
        currentRow.object !== undefined &&
        currentRow.object.find((row) => row.rowId === ids[i + 1])
      ) {
        rows = currentRow.object;
      } else if (
        currentRow.array !== undefined &&
        currentRow.array.rowId === ids[i + 1]
      ) {
        rows = [currentRow.array];
      } else {
        rows = {};
      }
    }

    // ids.forEach((id) => {
    //   // eslint-disable-next-line no-debugger
    //   // debugger;
    //   currentRow = rows.find((row) => row.rowId === id);

    //   if (currentRow.faker !== undefined && ) {
    //     rows = [currentRow.faker];
    //   } else if (currentRow.object !== undefined) {
    //     rows = currentRow.object;
    //   } else if (currentRow.array !== undefined) {
    //     rows = [currentRow.array];
    //   } else {
    //     rows = {}; // [] ?
    //   }
    // });

    return currentRow;
  },

  getPreparedData(state) {
    return state.preparedData;
  },
  // getChangedDataTable(state) {
  //   return state.changedDataTable;
  // },
  getTitle(state) {
    return state.title;
  },
  getForeignData(state) {
    return state.foreignData;
  },
};

export default getters;
