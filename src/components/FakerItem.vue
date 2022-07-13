<template>
  <v-container class="py-0">
    <v-divider class="mb-4"></v-divider>
    <v-row dense class="py-0">
      <v-col cols="2" dense>
        <FakerSelectType
          :rowId="item.rowId"
          :jsonType="jsonType"
          :fieldTitle="'faker'"
          :fieldName="'type'"
          :selectName="'Faker type'"
          :incomingItemValue="item.type"
          :path="path"
        />
      </v-col>
      <v-col v-if="item.type === 'sample'"
        cols="2"
        dense
        class="ml-2"
        align-self="center"
      >
        <FakerSampleSelect
          :rowId="item.rowId"
          :jsonType="'sample'"
          :fieldTitle="'faker'"
          :fieldName="'sample'"
          :selectName="'Dataset'"
          :path="path"
          :incomingItemValue="item.sample"
        />
      </v-col>
      <v-col v-if="item.type === 'enum'" 
        cols="6"
        dense
        class="pt-3"
        align-self="center"
      >
        <FakerEnumList
          :rowId="item.rowId"
          :path="path"
          :jsonType="jsonType"
        />
      </v-col>
      <v-col v-if="item.type === 'integer'" dense  align-self="center">
        <v-row>
          <v-col  cols="1" dense>

          </v-col>
          <v-col cols="3" dense class="justify-center" align-self="center">
            <FakerCheckbox
              :rowId="item.rowId"
              :labelName="'Unique value'"
              :fieldTitle="'unique'"
              :incomingValue="item.unique"
              :fieldName="'unique'"
            />
          </v-col>

          <v-col cols="2" dense class="" align-self="center" justify="center">
            <FakerCheckbox
              :rowId="item.rowId"
              :labelName="'to_str'"
              :fieldTitle="'to_str'"
              :incomingValue="item.to_str"
              :fieldName="'to_str'"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="item.type === 'code'" dense align-self="center">
        <v-row>
           <v-col cols="3" dense class="ml-6" align-self="center">
            <FakerNumberTextField
              :rowId="item.rowId"
              :textFieldLabel="'Length'"
              :field="'length'"
              :incomingValue="item.length"
            />
          </v-col>

          <v-col cols="3" dense class="ml-0 justify-left" align-self="center">
            <FakerCheckbox
              :rowId="item.rowId"
              :labelName="'Uppercase'"
              :fieldTitle="'upper'"
              :incomingValue="item.upper"
              :fieldName="'upper'"
            />
          </v-col>
         
        </v-row>
      </v-col>
      <v-col v-if="item.type === 'foreign'" dense align-self="center">
        <v-row>
          <v-col cols="5" dense class="ml-2" align-self="center">
            <FakerForeignFilesSelect
              :incomingItemValue="item.dataset"
              :rowId="item.rowId"
              :selectName="'Dataset'"

             />
          </v-col>

          <v-col  cols="4" dense class="ml-2" align-self="center">
            <FakerForeignFieldSelectedFile
              v-if="item.dataset.length !== 0"
              :incomingItemValue="item.field"
              :selectedFile="item.dataset"
              :rowId="item.rowId"
              :selectLabel="'Dataset field'"
             />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="item.type === 'date'" dense align-self="center">
        <v-row>
          <v-col cols="4" dense class="ml-2" align-self="center">
            <FakerTextField
              :incomingValue="item.format"
              :textFieldLabel="'Format'"
              :field="'format'"
              :rowId="item.rowId"

             />
          </v-col>

          <v-col v-if="item.min_year !== undefined" cols="3" dense class="ml-2" align-self="center">
            <FakerNumberTextField
              :incomingValue="item.min_year"
              :textFieldLabel="'Min'"
              :field="'min_year'"
              :dependedFieldValue="item.max_year"
              :rowId="item.rowId"
             />
          </v-col>

          <v-col v-if="item.max_year !== undefined" cols="3" dense class="ml-2" align-self="center">
            <FakerNumberTextField
              :incomingValue="item.max_year"
              :textFieldLabel="'Max'"
              :field="'max_year'"
              :dependedFieldValue="item.min_year"
              :rowId="item.rowId"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="item.type === 'array'" dense align-self="center">
        <v-row>
          <v-col cols="2" dense class="ml-2" align-self="center">
            <FakerNumberTextField
              :incomingValue="item.occurrence_min"
              :textFieldLabel="'Min'"
              :field="'occurrence_min'"
              :dependedFieldValue="item.occurrence_max"
              :rowId="item.rowId"
             />
          </v-col>

          <v-col cols="2" dense class="ml-2" align-self="center">
            <FakerNumberTextField
              :incomingValue="item.occurrence_max"
              :textFieldLabel="'Max'"
              :field="'occurrence_max'"
              :dependedFieldValue="item.occurrence_min"
              :rowId="item.rowId"
            />
          </v-col>
        </v-row>
      </v-col>

      <!-- <v-col>{{ item }}</v-col> -->
    </v-row>
  </v-container>
</template>

<script>
// import { mapGetters, mapMutations } from "vuex";
// import { typeRules } from "../features/rules";
import FakerSelectType from "./FakerSelectType.vue";
import FakerCheckbox from "./FakerCheckbox.vue";
import FakerEnumList from "./FakerEnumList.vue";
import FakerForeignFilesSelect from "./FakerForeignFilesSelect.vue";
import FakerForeignFieldSelectedFile from "./FakerForeignFieldSelectedFile.vue";
import FakerTextField from "./FakerTextField.vue";
import FakerNumberTextField from "./FakerNumberTextField.vue";
import FakerSampleSelect from "./FakerSampleSelect.vue";

export default {
  name: "FakerItem",
  components: {
    FakerSelectType,
    FakerSampleSelect,
    FakerCheckbox,
    FakerEnumList,
    FakerForeignFilesSelect,
    FakerForeignFieldSelectedFile,
    FakerTextField,
    FakerNumberTextField,
  },
  props: {
    item: Object,
    jsonType: String,
    rowId: String,
    path: String,
  },
  data() {
    return {
    //  bpm: 16,
    //   interval: null, 
    };
  },
  created() {},
  watch: {},

  computed: {
    // fakerPath() {
    //   return this.path + ':' + this.item.rowId;
    // },
    itemFaker() {
      const item = this.$store.getters.getCurrentItem(this.path)
      console.log(this.path, item);
      return item;
    }
  },
  methods: {},
};
</script>

<style scoped></style>
