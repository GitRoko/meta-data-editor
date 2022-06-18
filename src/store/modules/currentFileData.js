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
      // console.log("isHaveTitle =", isHaveTitle);
      
      let newTitle = "";
      
      if (isHaveTitle !== undefined) {
        newTitle = isHaveTitle.replace("# ", "");
        // console.log("newTitle = ", newTitle);
      }
      await commit("updateTitle", newTitle);

      await commit("updateDataJson", YAML.parse(state.currentFileData));

      const getData = () => {
        const newData = [];
        const innerData = state.dataJson;

        Object.keys(innerData).forEach((innerDataKey) => {
          let newItem = {
            rowId: uuidv4(),
            field_name: innerDataKey,
          };

          const innerDataItem = innerData[innerDataKey];

          const newItemKeys = Object.keys(innerDataItem);

          newItemKeys.forEach(key => {
            newItem = {...newItem, [key]: innerDataItem[key]}
          })
          newData.push(newItem);
          // newData.push({
          //   rowId: uuidv4(),
          //   field_name: item,
          //   json_type: innerData[item].json_type,
          //   mandatory: innerData[item].mandatory,
          //   td_type: innerData[item].td_type,
          //   pydantic_type: innerData[item].pydantic_type,
          //   example: innerData[item].example,
          //   faker: innerData[item].faker,
          //   description: innerData[item].description,
          //   pii: innerData[item].pii,
          // });
        });

        console.log(newData);
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
    // updateNewItemIndex(state, data) {
    //   state.newItemIndex = data;
    // },
  },

  state: {
    currentFileData: null, // together or separaite
    currentFile: null,
    title: "",
    dataJson: null,
    preparedDataTable: null,
    changedDataTable: null,
    // newItemIndex: null,
  },

  getters: {
    // getNewItemIndex(state) {
    //   return state.newItemIndex;
    // },
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
