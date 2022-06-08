<template>
  <v-container>
    <v-row>
      <v-sheet color="white" elevation="0" height="100%" width="100%">
        <v-col cols="12">
          <h2>
            <v-text-field
              class="field_name__textField mt-7"
              :value="textTitle || title"
              @input="updateTextTitle"
              label="Title"
              outlined
              dense
            ></v-text-field>
          </h2>
          <DataTable
            v-if="getPreparedDataTable"
            :initialData="getPreparedDataTable"
          />
        </v-col>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import DataTable from "../components/DataTable.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "ContentData",
  components: {
    DataTable,
  },
  props: {
    title: String,
  },
  computed: {
    ...mapGetters(["getPreparedDataTable"]),
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
