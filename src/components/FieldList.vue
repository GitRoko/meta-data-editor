<template>
  <v-expansion-panels 
    v-if="itemsData"
   focusable v-model="panel" multiple>
    <FieldListItem v-for="item in itemsData" :key="item.rowId" :item="item" :path="item.rowId"/>
    <!-- <v-expansion-panel-header
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
            <v-col
              v-if="item.json_type === 'array' || item.json_type === 'object'"
              cols="2"
              align-self="center"
              dense
            >
              <NestedToggler
                :innerNested="
                  item.hasOwnProperty('array') || item.hasOwnProperty('object')
                    ? true
                    : false
                "
              />
            </v-col>
            <v-col cols="3" align-self="center" class="text-center" dense>
              <AddItemMenu
                v-if="item === hoveredItemPanel"
                @removeItem="deleteItem(item.rowId)"
                @addItemBefore="openDialogAddItem(item.rowId, 'before')"
                @addItemAfter="openDialogAddItem(item.rowId, 'after')"
                @click.native.stop
              />
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
            <v-col
              v-if="
                !item.hasOwnProperty('array') && !item.hasOwnProperty('object')
              "
              cols="3"
              dense
            >
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

          <v-row v-if="item.hasOwnProperty('array')">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ item.array }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ item.array }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
          <v-row v-if="item.hasOwnProperty('object')">
            
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ item.object }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ item.object }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-container>
      </v-expansion-panel-content> -->
    <!-- <template>
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
    </template> -->
  </v-expansion-panels>
</template>

<script>
import FieldListItem from "./FieldListItem.vue";
// import TextFieldTable from "./TextFieldTable.vue";
// import ExempleTextField from "./ExempleTextField.vue";
// import SelectTypeTable from "./SelectTypeTable.vue";
// import CheckboxTable from "./CheckboxTable.vue";
// import DependentSelectTable from "./DependentSelectTable.vue";
// import NestedToggler from "./NestedToggler.vue";
// import AddItemMenu from "./AddItemMenu.vue";
// import { v4 as uuidv4 } from "uuid";
// import { mapMutations, mapGetters } from "vuex";
// import { mapGetters } from "vuex";

export default {
  name: "ExpansionPanelsData",
  components: {
    FieldListItem,
    // TextFieldTable,
    // SelectTypeTable,
    // CheckboxTable,
    // DependentSelectTable,
    // ExempleTextField,
    // AddItemMenu,
    // NestedToggler,
  },
  props: {
    initialData: Array,
  },
  created() {

    // this.itemsData = this.initialData;
    this.itemsData = this.$store.getters.getPreparedDataTable;
  },
  data() {
    return {
      itemsData: [],
      // hoveredItemPanel: false,
      panel: [],
      // dialog: false,
      // idActiveItem: "",
      // appendPlace: "",
      // dialogText: "",
      // selectValue: "",
      // dialogItems: ["string", "number", "array", "object", "boolean"],
    };
  },
  watch: {
    initialData(newV) {
      this.itemsData = newV;
    },
  },
  computed: {
    // ...mapGetters(["getPreparedDataTable"]),
  },
  methods: {
    //   ...mapMutations(["updatePreparedDataTable"]),
    //   openDialogAddItem(id, beforeAfter) {
    //     this.idActiveItem = id;
    //     this.appendPlace = beforeAfter;
    //     this.dialog = true;
    //   },
    //   addNew() {
    //     const newItem = this.getNewItem(this.dialogText, this.selectValue);
    //     const index = this.itemsData.findIndex(
    //       (item) => item.rowId === this.idActiveItem
    //     );
    //     if (index === 0 && this.appendPlace === "before") {
    //       return this.itemsData.splice(0, 0, newItem);
    //     }
    //     if (this.appendPlace === "before") {
    //       return this.itemsData.splice(index, 0, newItem);
    //     }
    //     if (this.appendPlace === "after") {
    //       return this.itemsData.splice(index + 1, 0, newItem);
    //     }
    //     this.updatePreparedDataTable(this.itemsData);
    //   },
    //   clearDialogInputs() {
    //     this.appendPlace = "";
    //     this.dialogText = "";
    //     this.selectValue = "";
    //     this.idActiveItem = "";
    //     this.dialog = false;
    //   },
    //   deleteItem(id) {
    //     const newItems = this.itemsData.filter((item) => item.rowId !== id);
    //     this.updatePreparedDataTable(newItems);
    //   },
    //   getNewItem(text, select) {
    //     return {
    //       rowId: uuidv4(),
    //       field_name: text,
    //       json_type: select,
    //       mandatory: false,
    //       td_type: "",
    //       pydantic_type: "",
    //       example: "",
    //       faker: {},
    //       description: "",
    //       pii: false,
    //     };
    //   },
    //   hoverItemPanel(item) {
    //     this.hoveredItemPanel = item;
    //   },
    //   unhoverItemPanel() {
    //     this.hoveredItemPanel = false;
    //   },
  },
};
</script>

<style scoped>
.action-btn {
  margin-left: auto;
}

</style>
