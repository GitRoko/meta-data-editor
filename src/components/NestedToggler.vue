<template>
  <v-switch @click.native.stop v-model="nested" :label="'Nested'"></v-switch>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { v4 as uuidv4 } from "uuid";

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
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeNested(newValue) {
      // console.log("newValue", newValue);

      const data = this.getPreparedDataTable();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item.nested = newValue;

          if (newValue === true && item.array === undefined) {
            item.array = {
              json_type: "string",
              mandatory: false,
              pydantic_type: "StrictStr",
              example: "Some string",
              rowId: uuidv4(),
            };
            // item.rowId = uuidv4()
            // const parentItem = this.path.split(":")[0];
            // data.find((item) => item.rowId === parentItem).rowId = uuidv4();
          }

          if (newValue === false && item.array) {
            delete item.array;
            // item.rowId = uuidv4()

            // const parentItem = this.path.split(":")[0];
            // data.find((item) => item.rowId === parentItem).rowId = uuidv4();
          }
        } else {
          if (item.array) {
            changeValue(item.array);
          }
          if (item.object) {
            changeValue(item.object);
          }
        }
      };

      const newData = data.map((item) => {
        changeValue(item);
        return item;
      });

      this.updatePreparedDataTable(newData);
      // this.$forceUpdate();
    },
  },
};
</script>
