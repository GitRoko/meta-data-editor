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
  name: "TextFieldTable",
  props: {
    incomingValue: [String, Number, Boolean, Array, Object],
    textFieldLabel: String,
    field: String,
  },
  data() {
    return {
      textValue: "",
      label: "",
    };
  },
  created() {
    this.textValue = (typeof this.incomingValue === 'string')
      ? this.incomingValue
      : JSON.stringify(this.incomingValue);

    this.label = this.textFieldLabel;
  },
  watch: {
    textValue(newValue, oldValue) {
      this.changeTextField(newValue, oldValue);
        this.$forceUpdate()

    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeTextField(newValue, oldValue) {
        const data = this.getPreparedDataTable();
  
        const newData = data.map(item => {
          // console.log("item[this.field] = ", item[this.field]);
          // console.log("oldValue = ", oldValue);
          // console.log("newValue = ", newValue);
          if (item[this.field] === oldValue) {
            item[this.field] = newValue;
          }

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
