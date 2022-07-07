<template>
  <v-text-field
    class="field_name__textField mt-7"
    v-model="textValue"
    :label="label"
    outlined
    dense
  ></v-text-field>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ExempleTextField",
  props: {
    incomingValue: [String, Number, Boolean, Array, Object],
    textFieldLabel: String,
    field: String,
    rowId: String,
    jsonType: String,
  },
  data() {
    return {
      textValue: "",
      label: "",
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
    textValue(newValue, oldValue) {
      this.changeTextField(newValue, oldValue);
    },
    incomingValue(newV) {
      this.textValue = typeof newV === "string" ? newV : JSON.stringify(newV);
    },
  },
  computed: {},
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeTextField(newValue) {
      const data = this.getPreparedDataTable();
      let preparedValue;
      console.log('newValue ', newValue);
      try {
        JSON.parse(newValue);
        preparedValue = JSON.parse(newValue);
      } catch {
        preparedValue = newValue;
      }

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          if (this.jsonType !== "string") {
            item[this.field] = preparedValue;
          } else {
            item[this.field] = newValue;
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
      this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.field_name__textField {
  width: 250px;
}
</style>
