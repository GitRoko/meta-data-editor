<template>
  <v-switch
  @click.native.stop
    v-model="nested"
    :label="'Nested'"
  ></v-switch>
</template>
<script>
export default {
  name: "NestedToggler",
  components: {},
  props: {
    innerNested: Boolean,
  },
  data() {
    return {
      nested: this.innerNested,
    };
  },
  computed: {},
  methods: {},
};
</script>
