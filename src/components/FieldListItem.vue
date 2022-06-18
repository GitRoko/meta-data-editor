<template>
  <v-expansion-panel class="my-1">
    <v-expansion-panel-header
      @mouseover="hoverItemPanel(item)"
      @mouseleave="unhoverItemPanel()"
    >
      <v-container>
        <v-row dense>
          <v-col cols="4" dense>
            <TextFieldTable
              :rowId="item.rowId"
              :textFieldLabel="'Field'"
              :field="'field_name'"
              :incomingValue="item.field_name"
            />
          </v-col>
          <v-col cols="3" dense>
            <SelectTypeTable
              :rowId="item.rowId"
              :field="item.field_name"
              :incomingValue="item.json_type"
            />
          </v-col>
          <v-col cols="2" align-self="center" dense>
            <CheckboxTable
              :rowId="item.rowId"
              :labelName="'Required'"
              :fieldTitle="'mandatory'"
              :incomingValue="item.mandatory"
            />
          </v-col>
          <v-col cols="3" align-self="center" class="text-center" dense>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-container>
        <v-row dense>
          <v-col cols="2" dense>
            <DependentSelectTable
              :rowId="item.rowId"
              :field="item.field_name"
              :fieldTitle="'td_type'"
              :selectName="'td type'"
              :incomingItemValue="item.td_type"
            />
          </v-col>
          <v-col cols="2" dense>
            <DependentSelectTable
              :rowId="item.rowId"
              :field="item.field_name"
              :fieldTitle="'pydantic_type'"
              :selectName="'Pydantic type'"
              :incomingItemValue="item.pydantic_type"
            />
          </v-col>
          <v-col cols="3" dense>
            <ExempleTextField
              :rowId="item.rowId"
              :textFieldLabel="'Example'"
              :field="'example'"
              :incomingValue="item.example"
            />
          </v-col>
          <v-col cols="3" dense>
            <TextFieldTable
              :rowId="item.rowId"
              :textFieldLabel="'Description'"
              :field="'description'"
              :incomingValue="item.description"
            />
          </v-col>
          <v-col cols="1" align-self="center" dense>
            <CheckboxTable
              :rowId="item.rowId"
              :labelName="'PII'"
              :field="item.field_name"
              :fieldTitle="'pii'"
              :incomingValue="item.pii"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import TextFieldTable from "./TextFieldTable.vue";
import ExempleTextField from "./ExempleTextField.vue";
import SelectTypeTable from "./SelectTypeTable.vue";
import CheckboxTable from "./CheckboxTable.vue";
import DependentSelectTable from "./DependentSelectTable.vue";
// import AddItemMenu from "./AddItemMenu.vue";
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
    // AddItemMenu,
  },
  props: {
    item: Object,
  },
  data() {
    return {
      hoveredItemPanel: false,
      // panel: [],
      // dialog: false,
      // idActiveItem: "",
      // appendPlace: "",
      // dialogText: "",
      // selectValue: "",
      // dialogItems: ["string", "number", "array", "object", "boolean"],
    };
  },
  computed: {
    ...mapGetters(["getPreparedDataTable"]),
  },
  methods: {
    ...mapMutations(["updatePreparedDataTable"]),

    openDialogAddItem(id, beforeAfter) {
      this.idActiveItem = id;
      this.appendPlace = beforeAfter;
      this.dialog = true;
    },

    addNew() {
      const newItem = this.getNewItem(this.dialogText, this.selectValue);
      const index = this.itemsData.findIndex(
        (item) => item.rowId === this.idActiveItem
      );

      if (index === 0 && this.appendPlace === "before") {
        return this.itemsData.splice(0, 0, newItem);
      }

      if (this.appendPlace === "before") {
        return this.itemsData.splice(index, 0, newItem);
      }

      if (this.appendPlace === "after") {
        return this.itemsData.splice(index + 1, 0, newItem);
      }

      this.updatePreparedDataTable(this.itemsData);
    },

    clearDialogInputs() {
      this.appendPlace = "";
      this.dialogText = "";
      this.selectValue = "";
      this.idActiveItem = "";

      this.dialog = false;
    },

    deleteItem(id) {
      const newItems = this.itemsData.filter((item) => item.rowId !== id);

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
    hoverItemPanel(item) {
      this.hoveredItemPanel = item;
    },

    unhoverItemPanel() {
      this.hoveredItemPanel = false;
    },
  },
};
</script>
