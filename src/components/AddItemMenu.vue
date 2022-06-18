<template>
  <v-speed-dial v-model="fab" :direction="direction" :transition="transition">
    <template v-slot:activator>
      <!-- <v-btn v-model="fab" small color="white" fab>
        <v-icon v-if="fab" color="grey darken-1"> mdi-close </v-icon>
        <v-icon v-else color="grey darken-1"> mdi-plus-minus </v-icon> -->
      <v-btn v-model="fab" small color="blue darken-2" dark fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-plus-minus </v-icon>
      </v-btn>
    </template>
    <v-btn fab icon dark small color="indigo" @click="appendItemBefore()">
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
    <v-btn fab icon dark small color="indigo" @click="appendItemAfter()">
      <v-icon>mdi-arrow-down</v-icon>
    </v-btn>
    <v-btn fab icon dark small color="red" @click="removeItem()">
      <v-icon>mdi-delete</v-icon>
    </v-btn>

  </v-speed-dial>
</template>

<script>
export default {
  name: "AddItemMenu",
  props: {},
  data() {
    return {
      direction: "left",
      fab: false,
      transition: "slide-y-reverse-transition",
    };
  },
  methods: {
    removeItem() {
      this.$emit("removeItem");
    },
    appendItemBefore() {
      this.$emit("addItemBefore", 'before');
    },
    appendItemAfter() {
      this.$emit("addItemAfter", 'after');
    },
  },
};
</script>
<style scoped>
.v-speed-dial {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-40%, 30%);
}

.v-btn--floating {
  position: relative;
}
</style>
