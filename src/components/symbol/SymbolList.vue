<template>
    <div>
        <li>
            <ul v-for="(symbol, i) in symbols" :key="i">{{symbol}}</ul>
        </li>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { Container } from "inversify";
import LelSymbolService from "@/service/LelSymbol";
import LelSymbol from "@/model/LelSymbol";
import SERVICE_IDENTIFIER from "@/di/Identifier";

@Component({
  name: "SymbolList"
})
export default class SymbolListVue extends Vue {
  @Inject(SERVICE_IDENTIFIER.CONTAINER) private _container: Container;

  private _service: LelSymbolService;

  symbols: Array<LelSymbol>;

  async fetchSymbols() {
    this.symbols = await this._service.list();
  }

  mounted() {
    this.fetchSymbols();
  }

  created() {
    this._service = this._container.get<LelSymbolService>(
      SERVICE_IDENTIFIER.SERVICE
    );
  }
}
</script>



