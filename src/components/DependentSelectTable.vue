<template>
  <v-select
    v-model="selectValue"
    :items="items"
    :label="selectLabel"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
export default {
  name: "DependentSelectTable",
  props: {
    incomingItems: Array,
    incomingItemValue: String,
    selectName: String,
  },
  data() {
    return {
      items: [],
      selectValue: "",
      selectLabel: "",
    };
  },
  created() {
    this.items = this.incomingItems;

    this.selectValue = this.items.includes(this.incomingItemValue)
      ? this.incomingItemValue
      : this.items[0];

    this.selectLabel = this.selectName;
  },
  methods: {},
};
</script>

<style scoped>
.field_name__selectField {
  width: 150px;
}
</style>
