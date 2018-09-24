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

@Component({
  name: 'home'
})
export default class Home extends Vue {}
</script>
