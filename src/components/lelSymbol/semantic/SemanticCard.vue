<template>
<v-card 
  flat
>
  <v-list-tile>
    <v-layout align-center justify-space-between row>
        <v-list-tile-content>
            <v-list-tile-title>{{this.semantic.description}}</v-list-tile-title>
            <v-list-tile-sub-title class="hiddenScroll">
              <v-btn round color="grey lighten-2" class="caption" depressed small
                v-for="symbolReferenced in this.semantic.symbolsReferenced"
                :key="symbolReferenced.id"
                :to="{ name: 'symbol-detail', params:{ id: symbolReferenced.id } }"
              >{{symbolReferenced.name}}</v-btn>
            </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-btn @click="removeSemantic()" icon>
            <v-icon color="red">delete</v-icon>
        </v-btn>
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


  async removeSemantic() {
    await semanticStore.removeSemantic({semanticId: this.semantic.id, type: this.semantic.type});
    return this.semantic.id;
  }

}
</script>



<style >
  .hiddenScroll {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .hiddenScroll::-webkit-scrollbar {
    display: none;
  }
</style>