<template>
  <v-expansion-panel
    v-if="item"
    class="my-2 rounded-lg"
    :class="bgColor"
    :style="bgColor"
  >
    <v-expansion-panel-header
      class="my-0 py-0 rounded-lg"
      @mouseover="hoverItemPanel(item)"
      @mouseleave="unhoverItemPanel()"
    >
      <v-container class="py-0">
        <v-row dense>
          <v-col v-if="item.field_name !== undefined" cols="4" dense>
            <TextField
              v-if="item.field_name"
              :rowId="item.rowId"
              :textFieldLabel="'Field'"
              :fieldName="'field_name'"
              :incomingValue="item.field_name"
              :path="path"
            />
          </v-col>
          <v-col v-if="item.json_type !== undefined" cols="3" dense>
            <JsonTypeSelect
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
            <CheckboxField
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
              :incomingValue="item.nested"
              :rowId="item.rowId"
              :path="path"
            />
          </v-col>
          <v-col cols="1" align-self="center" class="text-center" dense>
            <AddItemMenu
              v-if="hoveredItemPanel && !parentTypeArray"
              @click.native.stop
              :rowId="item.rowId"
              :path="path"
              @removeItem="deleteItem(item.rowId, path)"
              @addItemBefore="openDialogAddItem(item.rowId, 'before')"
              @addItemAfter="openDialogAddItem(item.rowId, 'after')"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-header>

    <v-expansion-panel-content class="py-0">
      <v-container class="py-0">
        <v-row dense class="py-0">
          <v-col
            v-if="item.td_type !== undefined"
            cols="2"
            dense
            align-self="center"
          >
            <DependentSelect
              :rowId="item.rowId"
              :jsonType="item.json_type"
              :fieldTitle="'td_type'"
              :selectLabel="'Td type'"
              :incomingItemValue="item.td_type"
            />
          </v-col>
          <v-col v-if="item.pydantic_type !== undefined" cols="3" dense>
            <DependentSelect
              :rowId="item.rowId"
              :jsonType="item.json_type"
              :fieldTitle="'pydantic_type'"
              :selectLabel="'Pydantic type'"
              :incomingItemValue="item.pydantic_type"
            />
          </v-col>
          <v-col v-if="item.example !== undefined" cols="3" dense>
            <ExampleTextField
              :jsonType="item.json_type"
              :rowId="item.rowId"
              :textFieldLabel="'Example'"
              :field="'example'"
              :incomingValue="item.example"
            />
          </v-col>
          <v-col v-if="item.description !== undefined" cols="3" dense>
            <TextField
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
            <CheckboxField
              :rowId="item.rowId"
              :labelName="'PII'"
              :fieldTitle="'pii'"
              :incomingValue="item.pii"
            />
          </v-col>
        </v-row>
      </v-container>
      <template v-if="item.faker">
        <FakerItem
          :item="item.faker"
          :rowId="item.rowId"
          :path="path + ':' + item.faker.rowId"
          :jsonType="item.json_type"
        />
      </template>
    </v-expansion-panel-content>
    <template>
      <div v-if="item.array !== undefined" class="ml-6">
        <v-expansion-panels focusable v-model="panel" multiple>
          <FieldListItem
            :item="itemArray"
            :path="path + ':' + itemArray.rowId"
            :parentTypeArray="true"
          />
        </v-expansion-panels>
      </div>
    </template>
    <template>
      <div v-if="item.object !== undefined" class="ml-6">
        <v-expansion-panels focusable v-model="panel" multiple>
          <FieldListItem
            v-for="item in itemObject"
            :key="item.rowId"
            :item="item"
            :path="path + ':' + item.rowId"
          />
        </v-expansion-panels>
      </div>
    </template>
    <template>
      <AddItemDialog
        :dialogShow="dialog"
        @addNewItem="addNew"
        @clearInputs="closeDialog"
      />
    </template>
  </v-expansion-panel>
</template>

<script>
import TextField from "./FieldInputs/TextField.vue";
import ExampleTextField from "./FieldInputs/ExampleTextField.vue";
import JsonTypeSelect from "./FieldInputs/JsonTypeSelect.vue";
import CheckboxField from "./FieldInputs/CheckboxField.vue";
import DependentSelect from "./FieldInputs/DependentSelect.vue";
import NestedToggler from "./FieldInputs/NestedToggler.vue";
import FakerItem from "./FakerItem.vue";

import AddItemMenu from "./AddItemMenu.vue";
import AddItemDialog from "./AddItemDialog.vue";
import { v4 as uuidv4 } from "uuid";
import { mapMutations, mapGetters } from "vuex";
import { fakerDefaultValue, typeRules } from "../features/rules";
import { getExample } from "../features/helperFunctions.js";

export default {
  name: "FieldListItem",
  components: {
    JsonTypeSelect,
    AddItemDialog,
    CheckboxField,
    DependentSelect,
    ExampleTextField,
    NestedToggler,
    AddItemMenu,
    FakerItem,
    TextField,
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
      dialog: false,
      idActiveItem: "",
      appendPlace: "",
    };
  },
  computed: {
    // ...mapGetters(["getCurrentItem"]),
    item() {
      return this.$store.getters.getCurrentItem(this.path);
    },
    itemArray() {
      return this.$store.getters.getCurrentItem(this.path).array || undefined;
    },
    itemObject() {
      return this.$store.getters.getCurrentItem(this.path).object || undefined;
    },
    bgColor() {
      // return `red lighten-5`;
      return `backgound-color:hsla(0, 100%, 40%, 0.2)`;
    },
  },
  watch: {},
  methods: {
    ...mapMutations(["updatePreparedDataTable"]),
    ...mapGetters(["getPreparedDataTable", "getCurrentItem"]),

    openDialogAddItem(id, beforeAfter) {
      this.idActiveItem = id;
      this.appendPlace = beforeAfter;
      this.dialog = true;
    },

    addNew(args) {
      // eslint-disable-next-line no-debugger
      // debugger;
      const { fieldName, fieldType } = args;
      const itemPathArray = this.path.split(":");

      let index = 0;
      let data = [];
      let newItem = {};

      if (itemPathArray.length === 1) {
        data = this.$store.state.currentFileData.preparedDataTable;
        newItem = this.getNewItem(fieldName, fieldType);
        index = data.findIndex((item) => item.rowId === this.idActiveItem);

        if (index === 0 && this.appendPlace === "before") {
          return data.splice(0, 0, newItem);
        } else if (this.appendPlace === "before") {
          return data.splice(index, 0, newItem);
        } else if (this.appendPlace === "after") {
          return data.splice(index + 1, 0, newItem);
        }

        this.updatePreparedDataTable(data);
      }

      if (itemPathArray.length > 1) {
        // eslint-disable-next-line no-debugger
        // debugger;

        const data = this.getPreparedDataTable();
        const parentPath = itemPathArray.slice(0, -1).join(":");
        const parentItem = this.$store.getters.getCurrentItem(parentPath);
        const parentId = parentItem.rowId;

        const changeValue = (item) => {
          if (item.rowId === parentId) {
            index = item.object.findIndex(
              (item) => item.rowId === this.idActiveItem
            );

            newItem = this.getNewItemObject(fieldName, fieldType);

            if (index === 0 && this.appendPlace === "before") {
              item.object.splice(0, 0, newItem);
            } else if (this.appendPlace === "before") {
              item.object.splice(index, 0, newItem);
            } else if (this.appendPlace === "after") {
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

        this.updatePreparedDataTable(newData);
      }
    },

    closeDialog() {
      this.appendPlace = "";
      this.idActiveItem = "";
      this.dialog = false;
    },

    deleteItem(id, itemPath) {
      // eslint-disable-next-line no-debugger
      // debugger;
      let newItems = [];
      const itemPathArray = itemPath.split(":");
      if (itemPathArray.length === 1) {
        newItems = this.getPreparedDataTable().filter(
          (item) => item.rowId !== id
        );
      }
      if (itemPathArray.length > 1) {
        const changeItem = (item) => {
          if (item.rowId === id) {
            // console.log("item = ", item);
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

        newItems = this.getPreparedDataTable().map((item) => {
          changeItem(item);

          return item;
        });
      }

      this.updatePreparedDataTable(newItems);
    },

    getNewItem(text, select) {
      const newFaker = fakerDefaultValue[typeRules.faker[select][0]];
      newFaker.rowId = uuidv4();

      return {
        rowId: uuidv4(),
        field_name: text,
        json_type: select,
        mandatory: false,
        td_type: "",
        pydantic_type: "",
        example: getExample(select),
        faker: { ...newFaker },
        description: "",
        pii: false,
      };
    },

    getNewItemObject(text, select) {
      const newFaker = fakerDefaultValue[typeRules.faker[select][0]];
      newFaker.rowId = uuidv4();

      return {
        field_name: text,
        json_type: select,
        mandatory: false,
        pydantic_type: "",
        example: getExample(select),
        faker: { ...newFaker },
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
