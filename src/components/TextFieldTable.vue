<template>
  <v-text-field
  @click.native.stop
    class="field_name__textField mt-7"
    :value="textValue"
    @input="changeTextField"
    :label="label"
    outlined
    dense
    :rules="[rules.required]"
  ></v-text-field>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TextFieldTable",
  props: {
    incomingValue: String,
    textFieldLabel: String,
    field: String,
    rowId: String,
  },
  data() {
    return {
      textValue: "",
      label: "",
      rules: {
        required: (value) => !!value || "Required",
      },
    };
  },
  created() {
    this.textValue =
      typeof this.incomingValue === "string"
        ? this.incomingValue
        : JSON.stringify(this.incomingValue);

    this.label = this.textFieldLabel;
  },
  watch: {
    textValue(newValue) {
      this.changeTextField(newValue);
    },
    incomingValue(newV) {
      this.textValue = newV;
    },
  },
  computed: {},
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeTextField(newValue) {
      const data = this.getPreparedDataTable();

      const newData = data.map((item) => {
        if (item.rowId === this.rowId) {
          item[this.field] = newValue;
        }

        return item;
      });

      this.updatePreparedDataTable(newData);
    },
  },
};
</script>

<style scoped>
.field_name__textField {
  width: 250px;
}
</style>
