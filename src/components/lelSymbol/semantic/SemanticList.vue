<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1 class="mt-3">
      <v-toolbar color="accent" dark>
        <v-toolbar-title>{{readableType}}</v-toolbar-title>
      </v-toolbar>
      <v-card v-if="!this.loading">
        <v-list v-if="thereAreSemantics" two-line>
          <SemanticCard v-for="semantic in this.semantics" :key="semantic._id" :semantic="semantic"></SemanticCard>
        </v-list>
        <v-card v-else class="whit-margin">
          <p class="empty-list">No hay {{pruralReadableType}} en este Simbolo</p>
        </v-card>
      </v-card>
      <v-card v-else class="whit-margin">
        <v-progress-circular class="loader" indeterminate color="secondary"></v-progress-circular>
      </v-card>
      <v-dialog width="500" persistent v-model="showModalForm">
        <SemanticForm :lelSymbolId="this.lelSymbolId" @cancel="closeModal"></SemanticForm>

        <v-btn color="secondary" slot="activator" dark fixed bottom right fab>
          <v-icon>add</v-icon>
        </v-btn>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SemanticStore from "@/store/Semantic";
import Semantic from "@/model/Semantic";
import Const from "@/constants";
import SemanticCard from "@/components/lelSymbol/semantic/SemanticCard.vue";
import SemanticForm from "@/components/lelSymbol/semantic/SemanticForm.vue";

@Component({
  name: "SematicList",
  components: { SemanticCard, SemanticForm }
})
export default class SematicListVue extends Vue {
  @Prop({ type: String, required: true })
  lelSymbolId: string;

  @Prop({ type: String, required: true })
  type: string;

  showModalForm: Boolean = false;

  loading: Boolean = true;

  closeModal() {
    this.showModalForm = false;
  }

  get readableType() {
    return Const.READABLE_SEMANTIC_TYPE.get(this.type);
  }

  get pruralReadableType() {
    return Const.PRURAL_READABLE_SEMANTIC_TYPE.get(this.type);
  }

  get semantics() {
    return SemanticStore.semantics[this.type];
  }

  get thereAreSemantics() {
    return SemanticStore.semantics[this.type].length > 0;
  }

  async mounted() {
    await SemanticStore.fetchTypeForSymbol({
      type: this.type,
      lelSymbolId: this.lelSymbolId
    });
    this.loading = false;
  }
}
</script>

<style>
.whit-margin {
  padding: 10px 15px;
}
.empty-list {
  text-align: center;
}
</style>
