<template>
  <v-layout row>

    <v-flex xs12 sm10 offset-sm1>
      <v-toolbar
      color="primary"
      class="mt-3"
      dark
      >
        <v-toolbar-title>Simbolos</v-toolbar-title>
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
          </LelSymbolCard>
        </v-list>
        

      </v-card>
      <v-dialog
        width="500"
        persistent
        v-model="showModalForm"
      >
        <LelSymbolForm
        @cancel="closeModal"></LelSymbolForm>

      <v-btn
      color="secondary"
      slot="activator"
      dark
      fixed
      bottom
      right
      fab
    >
      <v-icon>add</v-icon>
    </v-btn>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LelSymbolStore from "@/store/LelSymbol";
import LelSymbol from "@/model/LelSymbol";

import LelSymbolCard from "@/components/lelSymbol/LelSymbolCard.vue";
import LelSymbolForm from "@/components/lelSymbol/LelSymbolForm.vue";

@Component({
  name: "LelSymbolList",
  components: {LelSymbolCard, LelSymbolForm}
})
export default class LelSymbolListVue extends Vue {

  showModalForm: Boolean = false

  get lelSymbols() {
    return LelSymbolStore.lelSymbols
  }

  get isLelSymbolsEmpty() {
    return LelSymbolStore.lelSymbols.length === 0
  }

  async fetchLelSymbols() {
     await LelSymbolStore.fetchLelSymbols()
  }

  closeModal(){
    this.showModalForm = false
  }

  mounted() {
    LelSymbolStore.fetchLelSymbols()
  }

}
</script>



