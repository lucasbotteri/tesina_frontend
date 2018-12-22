<template>
<v-card 
  flat
>
  <v-list-tile>
    <v-layout align-center justify-space-between row>
        <v-list-tile-content>
            <v-list-tile-title>{{this.semantic.description}}</v-list-tile-title>
        </v-list-tile-content>
    </v-layout>
  </v-list-tile>
  <v-divider>
  </v-divider>


</v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import Const from "@/constants";
import Semantic from '@/model/Semantic';
import semanticStore from '@/store/Semantic';


@Component({
  name: "SemanticCard"
})
export default class SemanticCardVue extends Vue {
  @Prop({ type: Object, required: true })
  semantic: Semantic;

/*
  async removeSemantic() {
    await semanticStore.removeSemantic({semanticId: this.semantic.id, type: this.semantic.type});
    return this.lelSymbol.id;
  }
*/
}
</script>



