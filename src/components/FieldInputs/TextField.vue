<template>
  <v-text-field
    @click.native.stop
    class="field_name__textField mt-7"
    :value="textValue"
    @input="changeTextField"
    :label="label"
    outlined
    dense
  ></v-text-field>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TextField",
  props: {
    incomingValue: String,
    textFieldLabel: String,
    fieldName: String,
    rowId: String,
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

    this.label = this.textFieldLabel;
  },
  watch: {
    // textValue(newValue) {
    //   this.changeTextField(newValue);
    // },
    incomingValue(newV) {
      this.textValue = newV;
    },
  },
  computed: {},
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),

    changeTextField(newValue) {
      const item = this.$store.getters.getCurrentItem(this.path)
      item[this.fieldName] = newValue;
    },

  },
};
</script>

<style scoped>
.field_name__textField {
  width: 250px;
}
</style>
