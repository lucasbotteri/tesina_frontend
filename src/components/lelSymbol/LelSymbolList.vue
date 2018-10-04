<template>
  <v-layout row>

    <v-flex xs12 sm10 offset-sm1>
      <v-toolbar
      color="primary"
      class="mt-2"
      dark
      >
        <v-toolbar-title>Symbolos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card >
          <v-list two-line>
      
          <LelSymbolCard 
            v-for="lelSymbol in lelSymbols" 
            :key="lelSymbol._id"
            :lelSymbol="lelSymbol">
          <v-divider
                inset
          ></v-divider>
          </LelSymbolCard>
        </v-list>
        

      </v-card>
    </v-flex>
    <v-btn
    color="secondary"
    dark
    fixed
    bottom
    right
    fab
  >
    <v-icon>add</v-icon>
  </v-btn>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LelSymbolStore from "@/store/LelSymbol";
import LelSymbol from "@/model/LelSymbol";

import LelSymbolCard from "@/components/lelSymbol/LelSymbolCard.vue";

@Component({
  name: "LelSymbolList",
  components: {LelSymbolCard}
})
export default class LelSymbolListVue extends Vue {


  get lelSymbols() {
    return LelSymbolStore.lelSymbols
  }

  get isLelSymbolsEmpty() {
    return LelSymbolStore.lelSymbols.length === 0
  }

  async fetchLelSymbols() {
     await LelSymbolStore.fetchLelSymbols()
  }

  mounted() {
    LelSymbolStore.fetchLelSymbols()
  }

}
</script>



