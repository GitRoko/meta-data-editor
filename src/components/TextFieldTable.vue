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
export default {
  name: "TextFieldTable",
  props: {
    incomingValue: null,
    textFieldLabel: String,
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
};
</script>

<style scoped>
.field_name__textField {
  width: 250px;
}
</style>
