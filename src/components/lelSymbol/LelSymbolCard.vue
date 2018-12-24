<template>
<v-card 
  flat
>
  <v-list-tile :to="redirect">
    <v-layout align-center justify-space-between row>
        <v-list-tile-content>
            <v-list-tile-title>{{this.lelSymbol.name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{readableType()}}</v-list-tile-sub-title>
        </v-list-tile-content>
          <v-btn @click.prevent="removeLelSymbol()" icon>
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
import LelSymbolStore from "@/store/LelSymbol";
import LelSymbol from "@/model/LelSymbol";
import Const from "@/constants";


@Component({
  name: "LelSymbolCard"
})
export default class LelSymbolCardVue extends Vue {
  @Prop({ type: Object, required: true })
  lelSymbol: LelSymbol;

  redirect = {
    name: "symbol-detail",
    params: { id: this.lelSymbol.id }
  };

  readableType() {
    return Const.LEL_SYMBOL_TYPES_READABLE.get(this.lelSymbol.type);
  }

  async removeLelSymbol() {
    await LelSymbolStore.removeLelSymbol(this.lelSymbol.id);
    return this.lelSymbol.id;
  }
}
</script>



