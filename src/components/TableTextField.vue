<template>
  <v-text-field
    class="field_name__textField mt-7"
    v-model="textValue"
    label="Field"
    outlined
    dense
  ></v-text-field>
</template>

<script>
export default {
  name: "TableTextField",
  props: {
    incomingValue: String,
  },
  data() {
    return {
      textValue: "",
    };
  },
  created() {
    this.textValue = this.incomingValue;
  },
  methods: {},
};
</script>

<style scoped>
.field_name__textField {
  width: 250px;
}
</style>
