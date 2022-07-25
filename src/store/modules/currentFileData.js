import { readFile, writeFile } from "@/features/useFileSistemAPI";
import YAML from "yaml";
import { v4 as uuidv4 } from "uuid";
import { Document } from "yaml";

import { getExample, getNewField, getNewNestedField } from "../../features/helperFunctions.js";


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
        // console.log('arr = ', arr);

        const func = (p) => {
          // eslint-disable-next-line no-prototype-builtins
          if (p.json_type === "array" && p.hasOwnProperty("array")) {
            p.nested = true;
            func(p.array);
          }
          // eslint-disable-next-line no-prototype-builtins
          if (p.json_type === "array" && !p.hasOwnProperty("array")) {
            p.nested = false;
          }

          // eslint-disable-next-line no-prototype-builtins
          if (p.hasOwnProperty("faker")) {
            func(p.faker);
          }

          // eslint-disable-next-line no-prototype-builtins
          if (p.json_type === "object" && p.hasOwnProperty("object")) {
            p.nested = true;
            p.object = getData(p.object);
          }
          // eslint-disable-next-line no-prototype-builtins
          if (p.json_type === "object" && !p.hasOwnProperty("object")) {
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
          const helperField = ['field_name', 'nested', 'rowId'];

          const parseItem = (item) => {
            
            let itemKeys = Object.keys(item);
            let newItem = {};


            itemKeys.forEach(key => {
              // if (helperField.includes(key)) {
              //   delete item[key];
              // }
              if (key === 'faker') {
                newItem.faker = parseItem(item.faker);
              } else if (key === 'array') {

                  newItem.array = parseItem(item.array);

              } else if (key === 'object') {
          // // eslint-disable-next-line no-debugger
          // debugger;
                  item.object.forEach(item => {
                    newItem.object = {...newItem.object, [item.field_name]: parseItem(item)};
                  });
                
              } else if (!helperField.includes(key)) {

                newItem = {...newItem, [key]: item[key]};
              }

            })
            

              return {...newItem};
            
          }

          const data = state.preparedDataTable;
          let newData = {};

            
            data.forEach(item => {
              newData[item.field_name] = parseItem(item);
            })
          

          // newKeys.forEach((item) => {
          //   // console.log("item = ", item);
          //   const getItem = state.preparedDataTable.find(
          //     (arrayItem) => arrayItem.field_name === item
          //   );
          //   // console.log("getItem = ", getItem);
          //   newData = {
          //     ...newData,
          //     [item]: {
          //       json_type: getItem.json_type,
          //       mandatory: getItem.mandatory,
          //       td_type: getItem.td_type,
          //       pydantic_type: getItem.pydantic_type,
          //       example: getItem.example,
          //       description: getItem.description,
          //       pii: getItem.pii,
          //       faker: { ...getItem.faker },
          //     },
          //   };
          // });

          return newData;
        };
        
        console.log('saveData = ', newCurrentData());

        let yamlData = newCurrentData();
        const doc = new Document(yamlData);
        doc.commentBefore = ` ${state.title}`;
        

        await writeFile(state.currentFile.fileHandle, String(doc));
      }
    },
    // async saveFile({ state }) {
    //   if (state.getCurrentFileData !== "") {
    //     const newCurrentData = () => {
    //       let newData = {};
    //       const newKeys = state.preparedDataTable.map(
    //         (item) => item.field_name
    //       );
    //       // console.log("newKeys = ", newKeys);

    //       newKeys.forEach((item) => {
    //         // console.log("item = ", item);
    //         const getItem = state.preparedDataTable.find(
    //           (arrayItem) => arrayItem.field_name === item
    //         );
    //         // console.log("getItem = ", getItem);
    //         newData = {
    //           ...newData,
    //           [item]: {
    //             json_type: getItem.json_type,
    //             mandatory: getItem.mandatory,
    //             td_type: getItem.td_type,
    //             pydantic_type: getItem.pydantic_type,
    //             example: getItem.example,
    //             description: getItem.description,
    //             pii: getItem.pii,
    //             faker: { ...getItem.faker },
    //           },
    //         };
    //       });

    //       return newData;
    //     };
        
    //     console.log('saveData = ', newCurrentData());

    //     // let yamlData = newCurrentData();
    //     // const doc = new Document(yamlData);
    //     // doc.commentBefore = ` ${state.title}`;
        

    //     // await writeFile(state.currentFile.fileHandle, String(doc));
    //   }
    // },

    async getFileFields(_, handle) {
      // eslint-disable-next-line no-debugger
      // debugger;
      // console.log(handle);
      let file = await handle.fileHandle.getFile();
      const contents = await file.text();
      // const response = await readFile(handle);
      const fileData = YAML.parse(contents);
      const fields = Object.keys(fileData);
      // console.log('fields = ', fields);

      return fields;
    },

    addNewField({ state, commit, getters }, args) {
      // eslint-disable-next-line no-debugger
      // debugger;
      console.log('addNewField = ', args);
      const { fieldName, fieldType, path, appendPlace, idActiveItem } = args;
      const itemPathArray = path.split(":");

      let index = 0;
      let data = [];
      let newItem = {};

      if (itemPathArray.length === 1) {
        data = state.preparedDataTable;
        newItem = getNewField(fieldName, fieldType);
        index = data.findIndex((item) => item.rowId === idActiveItem);

        if (index === 0 && appendPlace === "before") {
          data.splice(0, 0, newItem);
        } else if (appendPlace === "before") {
          data.splice(index, 0, newItem);
        } else if (appendPlace === "after") {
          data.splice(index + 1, 0, newItem);
        }

        commit("updatePreparedDataTable", data);

      }

      if (itemPathArray.length > 1) {
        // eslint-disable-next-line no-debugger
        // debugger;

        const data = state.preparedDataTable;
        const parentPath = itemPathArray.slice(0, -1).join(":");
        const parentItem = getters.getCurrentItem(parentPath);
        const parentId = parentItem.rowId;

        const changeValue = (item) => {
          if (item.rowId === parentId) {
            index = item.object.findIndex(
              (item) => item.rowId === idActiveItem
            );

            newItem = getNewNestedField(fieldName, fieldType);

            if (index === 0 && appendPlace === "before") {
              item.object.splice(0, 0, newItem);
            } else if (appendPlace === "before") {
              item.object.splice(index, 0, newItem);
            } else if (appendPlace === "after") {
              item.object.splice(index + 1, 0, newItem);
            }
          } else {
            if (item.array) {
              changeValue(item.array);
            }
            if (item.object) {
              item.object.forEach((item) => {
                changeValue(item);
              });
            }
          }
        };

        const newData = data.map((item) => {
          changeValue(item);

          return item;
        });

        // this.updatePreparedDataTable(newData);
        commit("updatePreparedDataTable", newData);

      }
    },

    deleteItem({ state, commit }, args) {
      // eslint-disable-next-line no-debugger
      // debugger;
      const {itemId, itemPath} = args;
      console.log('deleteItem = ',args, itemId, itemPath);
      let newItems = [];
      const itemPathArray = itemPath.split(":");
      if (itemPathArray.length === 1) {
        newItems = state.preparedDataTable.filter(
          (item) => item.rowId !== itemId
        );
      }
      if (itemPathArray.length > 1) {
        const changeItem = (item) => {
          if (item.rowId === itemId) {
            // console.log("item = ", item);
          } else {
            if (item.array) {
              changeItem(item.array);
            }

            if (item.object) {
              let isHaveCurrentItem = item.object.find(
                (item) => item.rowId === itemId
              );

              if (isHaveCurrentItem) {
                item.object = item.object.filter((item) => item.rowId !== itemId);

                if (item.object.length === 0) {
                  delete item.object;
                  item.nested = false;
                  item.example = getExample(item.json_type);
                }
              } else {
                item.object.forEach((item) => {
                  changeItem(item);
                });
              }
            }
          }
        };

        newItems = state.preparedDataTable.map((item) => {
          changeItem(item);

          return item;
        });
      }

      commit("updatePreparedDataTable", newItems);
    },

    // changeItemFieldName({ getters, commit }, data) {
    //   const { fieldName, path, newValue } = data;
    //   // const item = getters.getCurrentItem(path);
    //   const rootFieldItem = getters.getRootFieldItem(path);
    //   // item[fieldName] = newValue;
    //   console.log(fieldName, path, newValue, rootFieldItem);
    //   // const preparedData = state.preparedDataTable;
    //   const objectLink = "[1].array.object[1].field_name";
    //   commit("updateItemFieldName", {newValue, objectLink});
    // }
  },

  mutations: {
    // updateItemFieldName(state, data) {
    //   console.log('data = ', data);
    //   state.preparedDataTable['[1].array.object[1].field_name'] = data.newValue;
    //   console.log(state.preparedDataTable[1].array.object[1].field_name);
    // },
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
    getRootFieldItem: (state) => (path) => {
      const itemPathArray = path.split(":");
      const item = state.preparedDataTable.find(
        (item) => item.rowId === itemPathArray[0]
      );
      return item;
    },
    getIndexRootFieldItem: (state) => (id) => {
      return state.preparedDataTable.findIndex((item) => item.rowId === id);
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
        return state.preparedDataTable.find((row) => row.rowId === id);
      }
      let currentRow = {};
      let rows = state.preparedDataTable;
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
        return state.preparedDataTable.find((row) => row.rowId === id);
      }
      let currentRow = {};
      let rows = state.preparedDataTable;
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
