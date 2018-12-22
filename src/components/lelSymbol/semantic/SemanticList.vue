<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <v-toolbar color="accent" class="mt-3" dark>
        <v-toolbar-title>{{readableType()}}</v-toolbar-title>
      </v-toolbar>
      <v-card v-if="!this.loading">
        <v-list two-line>
          <SemanticCard v-for="semantic in this.semantics" :key="semantic._id" :semantic="semantic"></SemanticCard>
        </v-list>
      </v-card>

      <v-progress-circular v-else indeterminate color="secondary"></v-progress-circular>

      <v-dialog width="500" persistent v-model="showModalForm">
        
        <SemanticForm
        :lelSymbolId="this.lelSymbolId"
        @cancel="closeModal"></SemanticForm>

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
  components: { SemanticCard, SemanticForm}
})
export default class SematicListVue extends Vue {
  @Prop({ type: String, required: true })
  lelSymbolId: string;

  @Prop({ type: String, required: true })
  type: string;

  semantics: Semantic[] = [];

  showModalForm: Boolean = false;

  loading: Boolean = true;

  closeModal() {
    this.showModalForm = false;
  }

  readableType() {
    return Const.READABLE_SEMANTIC_TYPE.get(this.type);
  }

  async mounted() {
    this.semantics =
      (await SemanticStore.fetchTypeForSymbol({
        type: this.type,
        lelSymbolId: this.lelSymbolId
      })) || [];
    this.loading = false;
  }
}
</script>



