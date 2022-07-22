<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="text-h5">Add new field</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="6">
              <v-text-field
                label="Field_name"
                v-model="dialogText"
                outlined
                dense
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="selectValue"
                :items="dialogItems"
                label="Type"
                outlined
                dense
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
          color="blue darken-1" 
          text 
          @click="clearInputs()"
        >
          Cansel
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="addNewItem(), clearInputs()"
        >
          Accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "AddItemDialog",
  props: {
    dialogShow: Boolean,
  },
  data() {
    return {
      dialog: this.dialogShow,
      dialogText: "",
      selectValue: "",
      dialogItems: ["string", "number", "array", "object", "boolean"],
    };
  },
  watch: {
    dialogShow() {
      this.dialog = this.dialogShow;
    },
  },
  methods: {
    clearInputs() {
      this.dialogText = "";
      this.selectValue = "";
      this.$emit("clearInputs");
    },
    addNewItem() {
      this.$emit("addNewItem", {
        fieldName: this.dialogText,
        fieldType: this.selectValue,
      });
    },
  },
};
</script>
<style scoped>
</style>
