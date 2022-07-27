import { readDirectory } from "../features/useFileSistemAPI";
import {
  readFile,
  writeFile,
  getFileFields,
} from "../features/useFileSistemAPI";
import YAML from "yaml";
// import { v4 as uuidv4 } from "uuid";
import { Document } from "yaml";
import {
  getExample,
  getNewField,
  getNewNestedField,
  prepareData,
} from "../features/helperFunctions.js";

const actions = {
  // read Directory
  async openDirectory(context) {
    const response = await readDirectory();
    // commit to state.files => [ {fileName, fileHandle, dirHandle}, ...]
    context.commit("updateFiles", response);
  },

  setTitle({ commit }, response) {
    const getArrayFromFileData = response.split("\n");
    const isHaveTitle = getArrayFromFileData[0].startsWith("#") ? true : false;

    let newTitle = "";

    if (isHaveTitle) {
      newTitle = getArrayFromFileData[0].replace("# ", "");
    }

    commit("updateTitle", newTitle);
  },

  async readFile(_, fileHandle) {
    const response = await readFile(fileHandle);
    const jsonFileData = YAML.parse(response);

    return jsonFileData;
  },

  async readCurrentFileData({ state, commit, dispatch }) {
    const response = await readFile(state.currentFile.fileHandle);

    dispatch("setTitle", response);

    const jsonFileData = YAML.parse(response);

    await commit("updateDataJson", jsonFileData); // for my help
    await commit("updatePreparedDataTable", prepareData(jsonFileData));

    await dispatch("setFakerForeignData");
  },

  async setFakerForeignData({ state, commit }) {
    const foreignDataOptions = {
      datasetOptions: [],
      fieldOptions: {},
    };

    for (const file of state.files) {
      foreignDataOptions.datasetOptions.push(file.fileName.split(".")[0]);

      await getFileFields(file).then((fields) => {
        foreignDataOptions.fieldOptions = {
          ...foreignDataOptions.fieldOptions,
          [file.fileName.split(".")[0]]: fields,
        };
      });
    }

    await commit("updateForeignData", foreignDataOptions);
  },

  async saveFile({ state }) {
    if (state.getCurrentFileData !== "") {
      const newCurrentData = () => {
        const helperField = ["field_name", "nested", "rowId"];

        const parseItem = (item) => {
          let itemKeys = Object.keys(item);
          let newItem = {};

          itemKeys.forEach((key) => {
            // if (helperField.includes(key)) {
            //   delete item[key];
            // }
            if (key === "faker") {
              newItem.faker = parseItem(item.faker);
            } else if (key === "array") {
              newItem.array = parseItem(item.array);
            } else if (key === "object") {
              // // eslint-disable-next-line no-debugger
              // debugger;
              item.object.forEach((item) => {
                newItem.object = {
                  ...newItem.object,
                  [item.field_name]: parseItem(item),
                };
              });
            } else if (!helperField.includes(key)) {
              newItem = { ...newItem, [key]: item[key] };
            }
          });

          return { ...newItem };
        };

        const data = state.preparedDataTable;
        let newData = {};

        data.forEach((item) => {
          newData[item.field_name] = parseItem(item);
        });

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

      console.log("saveData = ", newCurrentData());

      let yamlData = newCurrentData();
      const doc = new Document(yamlData);
      doc.commentBefore = ` ${state.title}`;

      await writeFile(state.currentFile.fileHandle, String(doc));
    }
  },

  // async getFileFields(_, handle) {
  //   const file = await handle.fileHandle.getFile();
  //   const contents = await file.text();
  //   const fileData = YAML.parse(contents);
  //   const fields = Object.keys(fileData);

  //   return fields;
  // },

  addNewField({ state, commit, getters }, args) {
    // eslint-disable-next-line no-debugger
    // debugger;
    console.log("addNewField = ", args);
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
          index = item.object.findIndex((item) => item.rowId === idActiveItem);

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
    const { itemId, itemPath } = args;
    console.log("deleteItem = ", args, itemId, itemPath);
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

  async deleteFile({ getters, commit }) {
    const { dirHandle, fileName } = getters.getCurrentFile;

    await dirHandle.removeEntry(fileName);

    const newFiles = getters.getFiles.filter((file) => {
      file.fileName !== fileName;
    });

    await commit("updateFiles", newFiles);
    await commit("updateCurrentFile", null);
    await commit("updateCurrentFile", null);
    await commit("updateCurrentFileData", null);
    await commit("updateTitle", "");
  },

  async createFile() {
    const options = {
      types: [
        {
          description: "Text Files",
          accept: {
            "text/plain": [".yaml"],
          },
        },
      ],
    };
    const handle = await window.showSaveFilePicker(options);
    return handle;
  },

  setCurrentFile({ state, commit, dispatch }, fileName) {
    const currentFile = state.files.find((file) => file.fileName === fileName);

    commit("updateCurrentFile", currentFile);

    dispatch("readCurrentFileData");
  },
};

export default actions;
