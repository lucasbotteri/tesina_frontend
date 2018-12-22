<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1 class="mt-3">
      <v-card v-if="!this.loading">
        <v-card-title>
          <h2 class="display-2 grey--text">{{this.lelSymbol.name}}</h2>
        </v-card-title>
        <v-card-text>
          <div>
            <div class="mt-3 mb-3">
              <p class="grey--text mb-2 caption font-weight-bold">Tipo:</p>
              <p>{{readableType()}}</p>
            </div>
            <v-divider></v-divider>
            <div class="mt-3 mb-3">
              <p class="grey--text mb-2 caption font-weight-bold">Descripcion:</p>
              <p>{{this.lelSymbol.description}}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-progress-circular v-else indeterminate color="secondary"></v-progress-circular>

      <SemanticList :lelSymbolId="this.lelSymbol.id.toString()" :type="notionType"></SemanticList>

      <SemanticList :lelSymbolId="this.lelSymbol.id.toString()" :type="behaviouralResponseType"></SemanticList>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import LelSymbolStore from "@/store/LelSymbol";
import LelSymbol from "@/model/LelSymbol";
import SemanticList from "@/components/lelSymbol/semantic/SemanticList.vue";
import Const from "@/constants";

@Component({
  name: "LelSymbolDetail",
  components: { SemanticList }
})
export default class LelSymbolDetail extends Vue {
  lelSymbol: LelSymbol;
  loading: Boolean = true;
  async created() {
    this.lelSymbol = await LelSymbolStore.fetchLelSymbol(this.$route.params.id);
    this.loading = false;
  }
  readableType(): string {
    return (
      Const.LEL_SYMBOL_TYPES_READABLE.get(this.lelSymbol.type) || "Sin tipo"
    );
  }

  get notionType() {
    return Const.SEMANTIC_TYPE.NOTION;
  }

  get behaviouralResponseType() {
    return Const.SEMANTIC_TYPE.BEHAVIOURAL_RESPONSE;
  }
}
</script>



