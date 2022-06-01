<template>
  <v-data-table
    disable-filtering
    disable-pagination
    disable-sort
    :headers="headersMainRow"
    :items="incomingDataTable"
    :expanded.sync="expanded"
    item-key="field_name"
    show-expand
    class="dataTable elevation-1"
  >
    <template v-slot:[`item.field_name`]="{ item }">
      <td class="field_name field_name__td">
        <TableTextField :incomingValue="item.field_name" />
      </td>
    </template>
    <template v-slot:[`item.json_type`]="{ item }">
      <td>
        <SelectDataTable :incomingValue="item.json_type" />
        </td>
    </template>
    <template v-slot:[`item.mandatory`]="{ item }">
      <td>
        <CheckboxTable :incomingValue="item.mandatory" />
        </td>
    </template>
    <template v-slot:expanded-item="{ item, headers }">
      <td :colspan="headers.length">
        <table class="expanded__table">
          <tr class="expanded__row d-flex justify-space-around align-center">
            <td>
              {{ item.td_type }}
            </td>
            <td>
              {{ item.pydantic_type }}
            </td>
            <td>
              {{ item.example }}
            </td>
          </tr>
        </table>
      </td>
    </template>
  </v-data-table>
  <!-- <p>{{ dataTable }}</p> -->
</template>

<script>
import TableTextField from "../components/TableTextField.vue";
import SelectDataTable from "../components/SelectDataTable.vue";
import CheckboxTable from "../components/CheckboxTable.vue";

export default {
  name: "DataTable",
  components: {
    TableTextField,
    SelectDataTable,
    CheckboxTable,
  },
  props: {
    incomingDataTable: Array,
  },
  created() {
    this.dataTable = this.incomingDataTable;
  },
  data() {
    return {
      dataTable: [],
      items: [],
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
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  methods: {},
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
/* .v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
  box-shadow: unset !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
  border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
} */
</style>
