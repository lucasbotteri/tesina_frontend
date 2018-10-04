<template>
<section>
    <v-list-tile :to="redirect">
        <v-list-tile-content>
            <v-list-tile-title v-html="this.lelSymbol.name"></v-list-tile-title>
            <v-list-tile-sub-title v-html="this.lelSymbol.type"></v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
    <v-divider inset></v-divider>
</section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import LelSymbolStore from "@/store/LelSymbol";
import LelSymbol from "@/model/LelSymbol";

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
}
</script>



