<template>
  <v-switch @click.native.stop v-model="nested" :label="'Nested'"></v-switch>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
// import { v4 as uuidv4 } from "uuid";
// import { fakerDefaultValue, typeRules } from "../../features/rules";
import {
  getExample,
  getNewNestedField,
} from "../../features/helperFunctions.js";

export default {
  name: "NestedToggler",
  components: {},
  props: {
    incomingValue: Boolean,
    rowId: String,
    path: String,
  },
  data() {
    return {
      nested: false,
    };
  },
  created() {
    this.nested = this.incomingValue;
  },
  watch: {
    nested(newValue, oldValue) {
      // console.log("newValue = ", newValue, oldValue);
      this.changeNested(newValue, oldValue);
    },
    incomingValue(newV) {
      this.nested = newV;
      this.$forceUpdate();
    },
  },
  methods: {
    ...mapGetters(["getPreparedData"]),
    ...mapMutations(["updatePreparedData"]),
    changeNested(newValue) {
      // console.log("newValue", newValue);

      const data = this.getPreparedData();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item.nested = newValue;
          
          if (
            newValue === true &&
            item.json_type === "array" &&
            item.array === undefined
          ) {
            item.array = getNewNestedField("someField", "string");
            item.example = undefined;
          }

          if (
            newValue === true &&
            item.json_type === "object" &&
            item.object === undefined
          ) {
            item.object = [getNewNestedField("someField", "string")];
            item.example = undefined;
          }

          if (
            newValue === false &&
            item.json_type === "array" &&
            item.array !== undefined
          ) {
            item.array = undefined;
            item.example = getExample("array");
          }

          if (
            newValue === false &&
            item.json_type === "object" &&
            item.object !== undefined
          ) {
            item.object = undefined;
            item.example = getExample("object");
          }
        } else {
          if (item.array) {
            changeValue(item.array);
          }
          
          if (item.object) {
            item.object.forEach((item) => {
              changeValue(item);
            });
          }
        }
      };

      const newData = data.map((item) => {
        changeValue(item);
        return item;
      });

      this.updatePreparedData(newData);
      this.$forceUpdate();
    },
  },
};
</script>
