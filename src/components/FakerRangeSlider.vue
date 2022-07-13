<template>
  <!-- <v-card width="300" height="70">
    <v-card-text> -->
      <div>

      <v-row justify="space-between">
        <v-col class="text-center pt-1">
          <span class="text font-weight-bold " v-text="bpm"></span>
        </v-col>
      </v-row>

      <v-slider v-model="bpm" min="0" max="16">
        <template v-slot:prepend>
          <v-icon @click="decrement"> mdi-minus </v-icon>
        </template>

        <template v-slot:append>
          <v-icon @click="increment"> mdi-plus </v-icon>
        </template>
      </v-slider>
      </div>
    <!-- </v-card-text>
  </v-card> -->
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "FakerRangeSlider",
  props: {
    incomingValue: Number,
    fieldTitle: String,
    labelName: String,
    rowId: String,
  },
  data() {
    return {
      bpm: this.incomingValue,
    };
  },
  created() {
    this.bpm = this.incomingValue;
  },
  watch: {
    bpm(newValue, oldValue) {
      this.changeTextField(newValue, oldValue);
    },
    incomingValue(newV) {
      this.bpm = newV;
    },
  },
  methods: {
    ...mapGetters(["getPreparedDataTable"]),
    ...mapMutations(["updatePreparedDataTable"]),
    changeTextField(newValue) {
      const data = this.getPreparedDataTable();

      const changeValue = (item) => {
        if (item.rowId === this.rowId) {
          item[this.fieldTitle] = newValue;
        } else {
          if (item.faker) {
            changeValue(item.faker);
          } else if (item.array) {
            changeValue(item.array);
          } else if (item.object) {
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

      this.updatePreparedDataTable(newData);
    },
    decrement() {
      this.bpm--;
      this.changeTextField(this.bpm)
    },
    increment() {
      this.bpm++;
      this.changeTextField(this.bpm)
    },
  },
};
</script>

<style scoped>
.field_name__checkbox {
  width: 100px;
}
</style>
