<template>
  <v-select
    v-model="sevectValue"
    :items="items"
    label="Type"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
export default {
  name: "SelectDataTable",
  props: {
    incomingValue: String,
  },
  data() {
    return {
      items: ["string", "number", "array", "object", "boolean"],
    };
  },
  created() {
    this.sevectValue = this.incomingValue;
  },
  methods: {},
};
</script>

<style scoped>
.field_name__selectField {
  width: 250px;
}
</style>
