<template>
  <v-checkbox
    v-model="checked"
    label="Required"
    color="primary"
    hide-details
    class="field_name__checkbox mt-0"
  ></v-checkbox>
</template>

<script>
export default {
  name: "CheckboxTable",
  props: {
    incomingValue: Boolean,
  },
  data() {
    return {
      checked: true,
    };
  },
  created() {
    this.checked = this.incomingValue;
  },
  methods: {},
};
</script>

<style scoped>
.field_name__checkbox {
  width: 100px;
}
</style>
