<template>
  <v-select
    :value="selectValue"
    @change="changeSelectValue"
    :items="options"
    :label="selectLabel"
    outlined
    dense
    class="field_name__selectField mt-7"
  ></v-select>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "FakerForeignFilesSelect",
  props: {
    incomingItemValue: String,
    selectLabel: String,
    rowId: String,
    options: Array
  },
  data() {
    return {
      selectValue: "",
    };
  },
  created() {
    this.selectValue = this.incomingItemValue;
    // this.selectValue = this.options.includes(this.incomingItemValue)
    //   ? this.incomingItemValue
    //   : '';

  },
  computed: {
  },
  watch: {
    selectValue(newValue, oldValue) {
      this.changeSelectValue(newValue, oldValue);
    },
  },
  methods: {
    ...mapGetters(["getPreparedData"]),
    ...mapMutations(["updatePreparedData"]),

    changeSelectValue(newValue) {
      const data = this.getPreparedData();
      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item.dataset = newValue;
        } else {
          if (item.faker) {
            changeValue(item.faker);
          }
          if (item.array) {
            changeValue(item.array);
          }
          if (item.object) {
            item.object.forEach((item) => {
              changeValue(item);
            });
          }
        }
      }

      const newData = data.map((item) => {
        changeValue(item);

        return item;
      });

      this.updatePreparedData(newData);
    },
  },
};
</script>

<style scoped>
/* .field_name__selectField {
  width: 250px;
} */
</style>
