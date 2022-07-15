<template>
  <v-text-field
    @click.native.stop
    class="field_name__textField mt-7"
    v-model.number="textValue"
    :label="label"
    outlined
    dense
    type="number"
  ></v-text-field>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "FakerNumberTextField",
  props: {
    incomingValue: Number,
    textFieldLabel: String,
    field: String,
    rowId: String,
    dependedFieldValue: Number,

  },
  data() {
    return {
      textValue: 0,
      label: "",
    }
  },
  created() {
    this.textValue =
      typeof this.incomingValue === "number"
        ? this.incomingValue
        : JSON.parse(this.incomingValue);

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

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item[this.field] = JSON.parse(newValue);
        } else {
                   if (item.faker) {
            changeValue(item.faker);
          }
          if (item.array) {
            changeValue(item.array);
          }
          if (item.object) {
            item.object.forEach((item) => {
              changeValue(item);
            });
          }
        }
      }

      const newData = data.map((item) => {
        changeValue(item);

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
