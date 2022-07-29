<template>
  <v-select
    @click.native.stop
    v-model="selectValue"
    :items="items"
    label="Type"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getExample } from "../../features/helperFunctions.js";
// import { v4 as uuidv4 } from "uuid";
// import { fakerDefaultValue } from "../features/rules";
import { fakerDefaultValue, typeRules } from "../../features/rules";

export default {
  name: "JsonTypeSelect",
  props: {
    incomingValue: String,
    rowId: String,
    path: String,
  },
  data() {
    return {
      items: ["string", "number", "array", "object", "boolean"],
      selectValue: this.incomingValue,
    };
  },
  created() {
    this.selectValue = this.incomingValue;
  },
  computed: {
    item() {
      return this.$store.getters.getCurrentItem(this.path);
    },
  },
  watch: {
    selectValue(newValue, oldValue) {
      this.changeSelectValue(newValue, oldValue);
    },
    incomingValue(newV) {
      this.selectValue = newV;
      this.$forceUpdate();
    },
  },
  methods: {
    ...mapGetters(["getPreparedData"]),
    ...mapMutations(["updatePreparedData"]),

    changeSelectValue(newValue, oldValue) {
      // const item = this.$store.getters.getCurrentItem(this.path)

      if (newValue !== oldValue) {
        this.item.json_type = newValue;
        this.item.example = getExample(newValue);
        
        let newKeys = Object.keys(
          fakerDefaultValue[typeRules.faker[newValue][0]]
        );
        let keys = Object.keys(this.item.faker);
        keys.forEach((key) => {
          if (key !== "rowId" && key !== "type") {
            delete this.item.faker[key];
          }
        });

        newKeys.forEach((key) => {
          this.item.faker[key] =
            fakerDefaultValue[typeRules.faker[newValue][0]][key];
        });
      }
       if (this.item.json_type === "array" || this.item.json_type === "object") {
            this.item.nested = false;

            if (this.item.array) {
              this.item.example = ["Some string"];
              this.item.array = undefined;
            }
            if (this.item.object) {
              this.item.example = { id: 123 };
              this.item.object = undefined;
            }
          } else {
            this.item.nested = undefined;

            if (this.item.array) {
              this.item.example = `${getExample(this.item.json_type)}`;
              this.item.array = undefined;
            }
            if (this.item.object) {
              this.item.example = `${getExample(this.item.json_type)}`;
              this.item.object = undefined;
            }
          }
       
    },
  },
};
</script>

<style scoped>
.field_name__selectField {
  width: 200px;
}
</style>
