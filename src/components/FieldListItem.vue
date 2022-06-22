<template>
  <v-expansion-panel class="my-2">
    <v-expansion-panel-header
      class="fieldListItem-header"
      @mouseover="hoverItemPanel(item)"
      @mouseleave="unhoverItemPanel()"
    >
      <v-container>
        <v-row dense>
          <!-- <v-col v-if="item.hasOwnProperty(field_name)" cols="4" dense> -->
            {{item}}
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
            />
          </v-col>
          <v-col
            v-if="item.nested !== undefined"
            cols="3"
            align-self="center"
            class="text-center"
            dense
          >
          {{item.nested}}
            <NestedToggler
              :key="item.nested"
              :incomingValue="item.nested"
              :rowId="item.rowId"
              :path="path"
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
      <div v-if="item.array !== undefined">
        <FieldListItem
          :key="JSON.stringify(item)"
          :item="item.array"
          :path="path + ':' + item.array.rowId"
          class="ml-6 fieldListItem"
        />
      </div>
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
// import AddItemMenu from "./AddItemMenu.vue";
// import { v4 as uuidv4 } from "uuid";
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
    // AddItemMenu,
  },
  props: {
    item: Object,
    path: {
      type: String,
      default: "",
    },
    // itemRowId: String,
  },
  data() {
    return {
      hoveredItemPanel: false,
      // componentKey: 0,
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
    // currentItem(itemRowId) {
    //   return this.$store.getters.getCurrentItem(itemRowId);
    // }
    // nestedItem() {
    //   return this.item.array;
    // }
  },
  watch: {
    item(v) {
      console.log("update! = ", this.item, v);
      this.$forceUpdate();
    },
  },
  methods: {
    ...mapMutations(["updatePreparedDataTable"]),
    // ...mapGetters(["getCurrentItem"]),
    // openDialogAddItem(id, beforeAfter) {
    //   this.idActiveItem = id;
    //   this.appendPlace = beforeAfter;
    //   this.dialog = true;
    // },
    // forceRerender() {
    //   this.componentKey += 1;
    // },
    // addNew() {
    //   const newItem = this.getNewItem(this.dialogText, this.selectValue);
    //   const index = this.itemsData.findIndex(
    //     (item) => item.rowId === this.idActiveItem
    //   );

    //   if (index === 0 && this.appendPlace === "before") {
    //     return this.itemsData.splice(0, 0, newItem);
    //   }

    //   if (this.appendPlace === "before") {
    //     return this.itemsData.splice(index, 0, newItem);
    //   }

    //   if (this.appendPlace === "after") {
    //     return this.itemsData.splice(index + 1, 0, newItem);
    //   }

    //   this.updatePreparedDataTable(this.itemsData);
    // },

    // clearDialogInputs() {
    //   this.appendPlace = "";
    //   this.dialogText = "";
    //   this.selectValue = "";
    //   this.idActiveItem = "";

    //   this.dialog = false;
    // },

    // deleteItem(id) {
    //   const newItems = this.itemsData.filter((item) => item.rowId !== id);

    //   this.updatePreparedDataTable(newItems);
    // },

    // getNewItem(text, select) {
    //   return {
    //     rowId: uuidv4(),
    //     field_name: text,
    //     json_type: select,
    //     mandatory: false,
    //     td_type: "",
    //     pydantic_type: "",
    //     example: "",
    //     faker: {},
    //     description: "",
    //     pii: false,
    //   };
    // },
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
/* .fieldListItem {
  border-left: 1px solid #D3D3D3;
} */
.fieldListItem-header {
  border-top: none;
  border-left: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
}
</style>
