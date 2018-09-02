<template>
<v-flex shrink>
<v-tooltip right>
  <v-btn
    icon
    large
    :href="source"
    target="_blank"
    slot="activator"
  >
    <v-icon large>code</v-icon>
  </v-btn>
  <span>Source</span>
</v-tooltip>
</v-flex>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import SymbolList from "@/components/symbol/SymbolList.vue";

@Component({
  components: {
    HelloWorld,
    SymbolList
  }
})
export default class Home extends Vue {}
</script>
