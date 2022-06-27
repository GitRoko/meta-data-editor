<template>
  <v-expansion-panel class="my-2 rounded-lg">
    <v-expansion-panel-header
      class="my-0 py-0 rounded-lg"
      @mouseover="hoverItemPanel(item)"
      @mouseleave="unhoverItemPanel()"
    >
      <v-container class="py-0">
        <v-row dense>
          <!-- <v-col v-if="item.hasOwnProperty(field_name)" cols="4" dense> -->
          <v-col v-if="item.field_name !== undefined" cols="4" dense>
            <TextFieldTable
              v-if="item.field_name"
              :key="item.field_name"
              :rowId="item.rowId"
              :textFieldLabel="'Field'"
              :field="'field_name'"
              :incomingValue="item.field_name"
            />
          </v-col>
          <v-col v-if="item.json_type !== undefined" cols="3" dense>
            <SelectTypeTable
              :key="item.json_type"
              :path="path"
              :rowId="item.rowId"
              :incomingValue="item.json_type"
            />
          </v-col>
          <v-col
            v-if="item.mandatory !== undefined"
            cols="2"
            align-self="center"
            dense
          >
            <CheckboxTable
              :key="item.mandatory"
              :rowId="item.rowId"
              :labelName="'Required'"
              :fieldTitle="'mandatory'"
              :incomingValue="item.mandatory"
              :path="path"
            />
          </v-col>
          <v-col
            v-if="item.nested !== undefined"
            cols="1"
            align-self="center"
            class="text-center"
            dense
          >
            <NestedToggler
              :key="item.nested"
              :incomingValue="item.nested"
              :rowId="item.rowId"
              :path="path"
            />
          </v-col>
         <!-- <v-col cols="1" align-self="center" class="text-center" dense>
             <AddItemMenu
              v-if="!parentTypeArray"
              @click.native.stop
              :rowId="item.rowId"
              :path="path"
              @removeItem="deleteItem(item.rowId, path)"
              @addItemBefore="openDialogAddItem(item.rowId, 'before', path)"
              @addItemAfter="openDialogAddItem(item.rowId, 'after', path)"
            />
          </v-col> -->
          <v-col cols="1" align-self="center" class="text-center" dense>
            <AddItemMenu
              v-if="hoveredItemPanel && !parentTypeArray"
              @click.native.stop
              :rowId="item.rowId"
              :path="path"
              @removeItem="deleteItem(item.rowId, path)"
              @addItemBefore="openDialogAddItem(item.rowId, 'before', path)"
              @addItemAfter="openDialogAddItem(item.rowId, 'after', path)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-container>
        <v-row dense>
          <v-col v-if="item.td_type !== undefined" cols="2" dense>
            <DependentSelectTable
              :rowId="item.rowId"
              :jsonType="item.json_type"
              :fieldTitle="'td_type'"
              :selectName="'Td type'"
              :incomingItemValue="item.td_type"
            />
          </v-col>
          <v-col v-if="item.pydantic_type !== undefined" cols="2" dense>
            <DependentSelectTable
              :rowId="item.rowId"
              :jsonType="item.json_type"
              :fieldTitle="'pydantic_type'"
              :selectName="'Pydantic type'"
              :incomingItemValue="item.pydantic_type"
            />
          </v-col>
          <v-col v-if="item.example !== undefined" cols="3" dense>
            <ExempleTextField
              :jsonType="item.json_type"
              :rowId="item.rowId"
              :textFieldLabel="'Example'"
              :field="'example'"
              :incomingValue="item.example"
            />
          </v-col>
          <v-col v-if="item.description !== undefined" cols="3" dense>
            <TextFieldTable
              :rowId="item.rowId"
              :textFieldLabel="'Description'"
              :field="'description'"
              :incomingValue="item.description"
            />
          </v-col>
          <v-col
            v-if="item.pii !== undefined"
            cols="1"
            align-self="center"
            dense
          >
            <CheckboxTable
              :rowId="item.rowId"
              :labelName="'PII'"
              :fieldTitle="'pii'"
              :incomingValue="item.pii"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-content>
    <template>
      <div v-if="item.array !== undefined" class="ml-6">
        <v-expansion-panels focusable v-model="panel" multiple>
          <FieldListItem
            :item="item.array"
            :path="path + ':' + item.array.rowId"
            :parentTypeArray="true"
          />
        </v-expansion-panels>
      </div>
    </template>
    <template>
      <div v-if="item.object !== undefined" class="ml-6">
        <v-expansion-panels focusable v-model="panel" multiple>
          <FieldListItem
            v-for="itemObject in item.object"
            :key="itemObject.rowId"
            :item="itemObject"
            :path="`${path}:${itemObject.rowId}`"
          />
        </v-expansion-panels>
      </div>
    </template>
    <template>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="text-h5">Add new field</v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="6">
                  <v-text-field
                    label="Field_name"
                    v-model="dialogText"
                    outlined
                    dense
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="selectValue"
                    :items="dialogItems"
                    label="Type"
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="clearDialogInputs()">
              Cansel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="addNew(), clearDialogInputs()"
            >
              Accept
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-expansion-panel>
</template>

<script>
import TextFieldTable from "./TextFieldTable.vue";
import ExempleTextField from "./ExempleTextField.vue";
import SelectTypeTable from "./SelectTypeTable.vue";
import CheckboxTable from "./CheckboxTable.vue";
import DependentSelectTable from "./DependentSelectTable.vue";
import NestedToggler from "./NestedToggler.vue";

import AddItemMenu from "./AddItemMenu.vue";
import { v4 as uuidv4 } from "uuid";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "FieldListItem",
  components: {
    TextFieldTable,
    SelectTypeTable,
    CheckboxTable,
    DependentSelectTable,
    ExempleTextField,
    NestedToggler,
    AddItemMenu,
  },
  props: {
    parentTypeArray: Boolean,
    path: {
      type: String,
      default: "",
    },
    // itemRowId: String,
  },
  data() {
    return {
      panel: [],

      hoveredItemPanel: false,
      componentKey: 0,
      dialog: false,
      idActiveItem: "",
      appendPlace: "",
      dialogText: "",
      dialogPath: "",
      selectValue: "",
      dialogItems: ["string", "number", "array", "object", "boolean"],
    };
  },
  computed: {
    ...mapGetters(["getPreparedDataTable", "getCurrentItem"]),
    item() {
      return this.$store.getters.getCurrentItem(this.path);
    },
    // nestedItem() {
    //   return this.item.array;
    // }
  },
  watch: {
    // item(v) {
    //   // console.log("update! = ", this.item, v);
    //   this.$forceUpdate();
    // },
  },
  methods: {
    ...mapMutations(["updatePreparedDataTable"]),

    // ...mapGetters(["getCurrentItem"]),
    openDialogAddItem(id, beforeAfter, itemPath) {
      this.idActiveItem = id;
      this.appendPlace = beforeAfter;
      this.dialogPath = itemPath;
      this.dialog = true;
    },
    addNew() {
      // eslint-disable-next-line no-debugger
      // debugger;
      console.log();
      const itemPathArray = this.dialogPath.split(":");

      let index = 0;
      let data = [];
      let newItem = {};
      // let newItems = [];

      if (itemPathArray.length === 1) {
        data = this.$store.state.currentFileData.preparedDataTable;
        newItem = this.getNewItem(this.dialogText, this.selectValue);
        index = data.findIndex((item) => item.rowId === this.idActiveItem);
      }

      if (itemPathArray.length > 1) {
        const changeItem = (item) => {
          if (item.rowId === this.idActiveItem) {
            console.log("item = ", item);
          } else {
            if (item.array) {
              changeItem(item.array);
            }

            if (item.object) {
              index = item.object.findIndex(
                (item) => item.rowId === this.idActiveItem
              );

              if (index < 0) {
                item.object.forEach((item) => {
                  changeItem(item);
                });
              } else {
                newItem = this.getNewItemObject(this.dialogText, this.selectValue);

                if (index === 0 && this.appendPlace === "before") {
                  return item.object.splice(0, 0, newItem);
                }

                if (this.appendPlace === "before") {
                  return item.object.splice(index, 0, newItem);
                }

                if (this.appendPlace === "after") {
                  return item.object.splice(index + 1, 0, newItem);
                }
              }
            }
          }
        };

        data = this.$store.state.currentFileData.preparedDataTable.map(
          (item) => {
            changeItem(item);

            return item;
          }
        );
      }

      if (index === 0 && this.appendPlace === "before") {
        return data.splice(0, 0, newItem);
      }

      if (this.appendPlace === "before") {
        return data.splice(index, 0, newItem);
      }

      if (this.appendPlace === "after") {
        return data.splice(index + 1, 0, newItem);
      }

      this.updatePreparedDataTable(data);
    },

    clearDialogInputs() {
      this.appendPlace = "";
      this.dialogText = "";
      this.selectValue = "";
      this.idActiveItem = "";
      this.dialogPath = "";

      this.dialog = false;
    },

    deleteItem(id, itemPath) {
      // eslint-disable-next-line no-debugger
      // debugger;
      let newItems = [];
      const itemPathArray = itemPath.split(":");
      if (itemPathArray.length === 1) {
        newItems = this.getPreparedDataTable.filter(
          (item) => item.rowId !== id
        );
      }
      if (itemPathArray.length > 1) {
        const changeItem = (item) => {
          if (item.rowId === id) {
            console.log("item = ", item);
          } else {
            if (item.array) {
              changeItem(item.array);
            }

            if (item.object) {

              let isHaveCurrentItem = item.object.find(
                (item) => item.rowId === id
              );

              if (isHaveCurrentItem) {

                item.object = item.object.filter((item) => item.rowId !== id);

                if (item.object.length === 0) {
                delete item.object;
                item.nested = false;
              }
              } else {
                item.object.forEach((item) => {
                  changeItem(item);
                });
              }
            }
          }
        };

        newItems = this.getPreparedDataTable.map((item) => {
          changeItem(item);

          return item;
        });
      }

      this.updatePreparedDataTable(newItems);
    },

    getNewItem(text, select) {
      return {
        rowId: uuidv4(),
        field_name: text,
        json_type: select,
        mandatory: false,
        td_type: "",
        pydantic_type: "",
        example: "",
        faker: {},
        description: "",
        pii: false,
      };
    },
    getNewItemObject(text, select) {
      return {
        field_name: text,
        json_type: select,
        mandatory: true,
        pydantic_type: "false",
        example: "",
        rowId: uuidv4(),
      };
    },
    hoverItemPanel(item) {
      this.hoveredItemPanel = item;
    },

    unhoverItemPanel() {
      this.hoveredItemPanel = false;
    },
  },
};
</script>
<style scoped>
.theme--light.v-expansion-panels .v-expansion-panel:not(:first-child)::after {
  border-color: transparent;
}
</style>
