<template>
  <v-container>
        <v-row>
          <v-sheet color="white" elevation="0" height="100%" width="100%">
            <v-col cols="12">
              <v-textarea
                v-model="dat"
                auto-grow
                solo
                name="text"
                label="Solo textarea"
              ></v-textarea>
              <p>{{ dat }}</p>
            </v-col>
          </v-sheet>
        </v-row>
      </v-container>
</template>

<script>
export default {
  name: "ContentData",
  props: {
    init_data: String,
  },
watch: {
  init_data() {
    this.dat = this.init_data
  }
},
  data() {
    return {
      dat: this.init_data
    }
  },
};
</script>
