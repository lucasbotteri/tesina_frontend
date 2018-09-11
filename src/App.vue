<template>
  <div id="app">
  <v-app id="inspire" dark>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <router-link tag="v-list-tile" to="/simbolos">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Simbolos</v-list-tile-title>
            </v-list-tile-content>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>LEL Manager</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
    </v-footer>
  </v-app>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import SERVICE_IDENTIFIER from '@/di/Identifier';
import container from '@/di/container';

@Component({
  name: 'App',
  provide: {
    [SERVICE_IDENTIFIER.CONTAINER]: container
  },
})
export default class App extends Vue {
  drawer: Boolean = true;
  @Prop() source: String;
}
</script>
