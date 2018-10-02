<template>
<v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-list v-show="!isLelSymbolsEmpty" two-line>
                <template v-for="(lelSymbol, index) in lelSymbols">

                  <v-list-tile
                    :key="lelSymbol.id"
                  >

                    <v-list-tile-content>
                      <v-list-tile-title v-html="lelSymbol.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="lelSymbol.type"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
              <p v-show="isLelSymbolsEmpty" >NO HAY SIMBOLOS</p>
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

@Component({
  name: "SymbolList"
})
export default class SymbolListVue extends Vue {

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



