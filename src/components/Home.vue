<template>
<v-flex shrink>
  <div class="text-xs-center mt-5">
    <h1>
      Bienvenido al administrador de LEL
    </h1>
  </div>
</v-flex>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: 'home'
})
export default class Home extends Vue {}
</script>
