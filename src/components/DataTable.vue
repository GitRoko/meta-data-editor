<template>
  <v-data-table
    disable-filtering
    disable-pagination
    disable-sort
    hide-default-header
    hide-default-footer
    :headers="headersMainRow"
    :items="itemsRow"
    :expanded.sync="expanded"
    item-key="rowId"
    show-expand
    class="dataTable elevation-1"
  >
    <template v-slot:[`item.field_name`]="{ item }">

      <td class="field_name field_name__td">
        <TextFieldTable
          :rowId="item.rowId"
          :textFieldLabel="'Field'"
          :field="'field_name'"
          :incomingValue="item.field_name"
        />
      </td>

    </template>
    <template v-slot:[`item.json_type`]="{ item }">
      <td class="field_name field_name__td">
        <SelectTypeTable
          :rowId="item.rowId"
          :field="item.field_name"
          :incomingValue="item.json_type"
        />
      </td>
    </template>
    <template v-slot:[`item.mandatory`]="{ item }">
      <td>
        <CheckboxTable
          :rowId="item.rowId"
          :labelName="'Required'"
          :fieldTitle="'mandatory'"
          :incomingValue="item.mandatory"
        />
      </td>
    </template>
    <template v-slot:expanded-item="{ item, headers }">
      <td :colspan="headers.length">
        <table class="expanded__table">
          <tr class="expanded__row d-flex justify-space-around align-center">
            <td>
              <DependentSelectTable
                :rowId="item.rowId"
                :field="item.field_name"
                :fieldTitle="'td_type'"
                :selectName="'TD type'"
                :incomingItemValue="item.td_type"
              />
            </td>
            <td>
              <DependentSelectTable
                :rowId="item.rowId"
                :field="item.field_name"
                :fieldTitle="'pydantic_type'"
                :selectName="'Pydantic type'"
                :incomingItemValue="item.pydantic_type"
              />
            </td>
            <td>
              <ExempleTextField
                :rowId="item.rowId"
                :textFieldLabel="'Example'"
                :field="'example'"
                :incomingValue="item.example"
              />
            </td>
            <td>
              <TextFieldTable
                :rowId="item.rowId"
                :textFieldLabel="'Description'"
                :field="'description'"
                :incomingValue="item.description"
              />
            </td>
            <td>
              <CheckboxTable
                :rowId="item.rowId"
                :labelName="'PII'"
                :field="item.field_name"
                :fieldTitle="'pii'"
                :incomingValue="item.pii"
              />
            </td>
          </tr>
        </table>
      </td>
    </template>
  </v-data-table>
  <!-- <p>{{ dataTable }}</p> -->
</template>

<script>
import TextFieldTable from "../components/TextFieldTable.vue";
import ExempleTextField from "../components/ExempleTextField.vue";
import SelectTypeTable from "./SelectTypeTable.vue";
import CheckboxTable from "./CheckboxTable.vue";
import DependentSelectTable from "./DependentSelectTable.vue";
// import { typeRules } from "../features/rules";

export default {
  name: "DataTable",
  components: {
    TextFieldTable,
    SelectTypeTable,
    CheckboxTable,
    DependentSelectTable,
    ExempleTextField,
  },
  props: {
    initialData: Array,
  },
  created() {
    this.itemsRow = this.initialData;
  },
  data() {
    return {
      dataTable: [],
      itemsRow: this.initialData,
      expanded: [],
      headersMainRow: [
        {
          text: "Field name",
          align: "left",
          filterable: false,
          value: "field_name",
        },
        {
          text: "Json type",
          align: "left",
          filterable: false,
          value: "json_type",
        },
        { text: "Required", filterable: false, value: "mandatory" },
        { text: "", align: "center", value: "data-table-expand" },
      ],
    };
  },
  watch: {
    initialData(newV) {
      // console.log("newV", newV);
      // console.log("oldV", oldV);
      this.itemsRow = newV;
        // this.ForcesUpdateComponent();
    },
  },
  computed: {
    // itemsRow() {
    //   return this.$store.state.currentFileData.preparedDataTable;
    // }
  },
  methods: {
    // getSelectItems(mainValue, nameValue) {
    //   return typeRules[nameValue][mainValue];
    // },
    ForcesUpdateComponent() {
      // your code
      this.$forceUpdate();
      // your code
    },
  },
};
</script>

<style scoped>
.field_name__td {
  width: 250px;
}
.expanded__table {
  width: 100%;
  height: 100%;
}
.expanded__row {
  width: 100%;
  height: 100%;
}
</style>
