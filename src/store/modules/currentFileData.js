import { readFile, writeFile } from "@/features/useFileSistemAPI";
import YAML from "yaml";
import { v4 as uuidv4 } from 'uuid';
import { Document } from "yaml";

export default {
  actions: {
    async getActiveFileData({ state, commit }) {
      const response = await readFile(state.currentFile.fileHandle);

      await commit("updateActiveFileData", response);
      const getArrayFromFileData = state.currentFileData.split("\n");

      const isHaveTitle = getArrayFromFileData.find((item) =>
      item.startsWith("#")
      );
      
      let newTitle = "";
      
      if (isHaveTitle !== undefined) {
        newTitle = isHaveTitle.replace("# ", "");
        // console.log("newTitle = ", newTitle);
      }
      await commit("updateTitle", newTitle);

      await commit("updateDataJson", YAML.parse(state.currentFileData));

      const getData = (obj = state.dataJson) => {
        // const newData = [];
        const innerData = obj;

        const arr = Object.keys(innerData);

        const func = (p) => {
          // eslint-disable-next-line no-prototype-builtins
          if (p.json_type === 'array' && p.hasOwnProperty('array')) {
            p.nested = true;
            func(p.array);
          }
          // eslint-disable-next-line no-prototype-builtins
          if (p.json_type === 'array' && !p.hasOwnProperty('array')) {
            p.nested = false;
          }
          
          // eslint-disable-next-line no-prototype-builtins
          if (p.json_type === 'object' && p.hasOwnProperty('object')) {
            p.nested = true;
            p.object = getData(p.object);
          }
          // eslint-disable-next-line no-prototype-builtins
          if (p.json_type === 'object' && !p.hasOwnProperty('object')) {
            p.nested = false;
          }

          p.rowId = uuidv4();

          return p;
        };

        const newData = arr.map((innerDataKey) => {

          return func({ ...innerData[innerDataKey], field_name: innerDataKey });
        });

        console.log("newData = ", newData);
        return newData;
      };
      await commit("updatePreparedDataTable", getData());
    },

    async saveFile({ state }) {
      if (state.getCurrentFileData !== "") {
        const newCurrentData = () => {
          let newData = {};
          const newKeys = state.preparedDataTable.map(
            (item) => item.field_name
          );
          // console.log("newKeys = ", newKeys);

          newKeys.forEach((item) => {
            // console.log("item = ", item);
            const getItem = state.preparedDataTable.find(
              (arrayItem) => arrayItem.field_name === item
            );
            // console.log("getItem = ", getItem);
            newData = {
              ...newData,
              [item]: {
                json_type: getItem.json_type,
                mandatory: getItem.mandatory,
                td_type: getItem.td_type,
                pydantic_type: getItem.pydantic_type,
                example: getItem.example,
                description: getItem.description,
                pii: getItem.pii,
                faker: { ...getItem.faker },
              },
            };
          });

          return newData;
        };

        let yamlData = newCurrentData();
        const doc = new Document(yamlData);
        doc.commentBefore = ` ${state.title}`;

        await writeFile(state.currentFile.fileHandle, String(doc));
      }
    },
  },

  mutations: {
    updateActiveFile(state, files) {
      state.currentFile = files;
    },
    updateActiveFileData(state, data) {
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
  },

  state: {
    currentFileData: null, // together or separaite
    currentFile: null,
    title: "",
    dataJson: null,
    preparedDataTable: null,
    changedDataTable: null,
  },

  getters: {
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
      const ids = id.split(':');
      if (ids.length === 1) {
        return  state.preparedDataTable.find(row => row.rowId === id);
      }
      let currentRow = {};
      let rows = state.preparedDataTable;
      ids.forEach(idIds => {
        currentRow = rows.find(row => row.rowId === idIds);

        if (currentRow.object) {
          rows = currentRow.object
        } else if (currentRow.array) {
          rows = [currentRow.array]
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
    getPreparedDataTable(state) {
      return state.preparedDataTable;
    },
    getChangedDataTable(state) {
      return state.changedDataTable;
    },
    getTitle(state) {
      return state.title;
    },
  },
};
