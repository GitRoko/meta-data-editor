<template>
  <v-text-field
    class="enum__textField"
    v-model="textValue"
    :label="label"
    outlined
    dense
    hide-details
  ></v-text-field>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "EnumTextField",
  props: {
    incomingValue: [String, Number, Boolean, Array, Object],
    index: Number,
    textFieldLabel: String,
    jsonType: String,
    path: String,
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
    // console.log(JSON.stringify(this.incomingValue));

    this.label = this.textFieldLabel;
  },
  watch: {
    textValue(newValue, oldValue) {
      console.log("watch newValue = ", newValue);

      this.changeTextField(newValue, oldValue);
    },
    incomingValue(newV) {
      // this.textValue = newV;
      this.textValue = typeof newV === "string" ? newV : JSON.stringify(newV);
    },
  },
  computed: {},
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeTextField(newValue) {
      console.log("newValue = ", newValue);
      const data = this.getPreparedDataTable();
      console.log("data = ", data);
      let preparedValue;
        // eslint-disable-next-line no-debugger
        // debugger;
            try {
                JSON.parse(newValue);
                preparedValue = JSON.parse(newValue);
              } catch {
                preparedValue = newValue;
              }

      const newData = data.map((item) => {
        if (item.rowId === this.path) {
          if (this.jsonType !== "string") {
            
            item.faker.values[this.index] = preparedValue;
          } else {
            item.faker.values[this.index] = newValue;
          }
        }
        return item;
      });

      this.updatePreparedDataTable(newData);
      // this.$forceUpdate();
    },
  },
};
</script>

<style scoped>
.enum__textField {
  width: 250px;
}
</style>
