<template>
<v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>

              <v-list two-line>
                <template v-for="(item, index) in symbols">
                  <v-subheader
                    v-if="item.header"
                    :key="item.header"
                  >
                    {{ item.header }}
                  </v-subheader>

                  <v-divider
                    v-else-if="item.divider"
                    :inset="item.inset"
                    :key="index"
                  ></v-divider>

                  <v-list-tile
                    v-else
                    :key="item.title"
                    avatar
                  >
                    <v-list-tile-avatar>
                      <img :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
          <v-btn
          color="secondary"
          dark
          fixed
          bottom
          right
          fab
        >
          <v-icon>add</v-icon>
        </v-btn>
        </v-layout>
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



