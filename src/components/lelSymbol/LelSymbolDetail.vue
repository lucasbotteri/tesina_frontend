<template>
<v-layout row >

    <v-flex xs12 sm10 offset-sm1>
        <v-card v-if="!this.loading">
            <v-card-title class="justify-center">
                <h2 class="display-2 text-xs-center">{{this.lelSymbol.name}}</h2>
            </v-card-title>

            <v-card-text>
                <h3 class="subheading">{{this.lelSymbol.type}}</h3>
                <p>{{this.lelSymbol.description}}</p>
            </v-card-text>
        </v-card>
        
        <v-progress-circular
        v-else
        indeterminate
        color="secondary"
      ></v-progress-circular>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import LelSymbolStore from "@/store/LelSymbol";
import LelSymbol from "@/model/LelSymbol";

@Component({
  name: "LelSymbolDetail"
})
export default class LelSymbolDetail extends Vue {
    lelSymbol: LelSymbol
    loading: Boolean = true
    async created(){
        this.lelSymbol = await LelSymbolStore.fetchLelSymbol(this.$route.params.id)
        this.loading = false
    }
}
</script>



