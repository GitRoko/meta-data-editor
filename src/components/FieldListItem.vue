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
              @removeItem="deleteCurrentItem(item.rowId, path)"
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
        @addNewItem="addNewFieldItem"
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
import { mapActions } from "vuex";

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
      itemField: this.$store.getters.getCurrentItem(this.path),
    };
  },
  computed: {
    item: function () {
      return this.$store.getters.getCurrentItem(this.path);
    },
    itemArray: function () {
      return this.$store.getters.getCurrentItem(this.path).array || undefined;
    },
    itemObject: function () {
      return this.$store.getters.getCurrentItem(this.path).object || undefined;
    },
    bgColor() {
      // return `red lighten-5`;
      return `backgound-color:hsla(0, 100%, 40%, 0.2)`;
    },
  },
  watch: {},
  methods: {
    ...mapActions(["deleteItem", "addNewField"]),

    openDialogAddItem(id, beforeAfter) {
      this.idActiveItem = id;
      this.appendPlace = beforeAfter;
      this.dialog = true;
    },

    addNewFieldItem(args) {
      const arg = { ...args, path: this.path, appendPlace: this.appendPlace, idActiveItem: this.idActiveItem };
      this.addNewField( arg );
    },

    closeDialog() {
      this.appendPlace = "";
      this.idActiveItem = "";
      this.dialog = false;
    },
  
    deleteCurrentItem(itemId = this.item.rowId, itemPath = this.path) {
      this.deleteItem({itemId, itemPath});
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
