<template>
    <div>
        <li>
            <ul v-for="(symbol, i) in symbols" :key="i">{{symbol}}</ul>
        </li>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LelSymbolService from "@/service/LelSymbol";
import LelSymbol from "@/model/LelSymbol";

@Component({
  name: "SymbolList"
})
export default class SymbolListVue extends Vue {
  symbols: Array<LelSymbol>;
  async fetchSymbols() {
    const l = new LelSymbolService();
    const symbols = await l.list();
    this.symbols = symbols;
  }

  mounted() {
    this.fetchSymbols;
  }
}
</script>



