<template>
  <v-container class="grey lighten-5">
    <v-row class="justify-center">
      <v-sheet color="grey lighten-5"  elevation="0" height="100%" width="1024">
        <v-col cols="12">
          <h2>
            <v-text-field
              v-if="getPreparedData"
              class="field_name__textField mt-7"
              :value="textTitle || title"
              @input="updateTextTitle"
              label="Description"
              outlined
              dense
            ></v-text-field>
          </h2>
          <ExpansionPanelsData
            v-if="getPreparedData"
            :initialData="getPreparedData"
          />
          <!-- <DataTable
            v-if="getPreparedData"
            :initialData="getPreparedData"
          /> -->
        </v-col>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
// import DataTable from "../components/DataTable.vue";
import { mapState, mapGetters } from "vuex";
import ExpansionPanelsData from "./FieldList.vue"

export default {
  name: "ContentData",
  components: {
    // DataTable,
    ExpansionPanelsData,
  },
  props: {
    title: String,
  },
  data() {
    return {
      hasNewData: false,
    };
  },
  computed: {
    ...mapGetters(["getPreparedData"]),
    ...mapState({
      textTitle: (state) => state.title,
    }),
  },
  methods: {
    updateTextTitle(e) {
      // console.log("e = ", e);
      this.$store.commit("updateTitle", e);
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
