<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" v-if="this.loggedIn" fixed clipped app>
      <v-list dense>
        <router-link tag="v-list-tile" to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </router-link>
        <router-link tag="v-list-tile" to="/proyectos">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Proyectos</v-list-tile-title>
          </v-list-tile-content>
        </router-link>
        <router-link v-if="isAdmin" tag="v-list-tile" to="/usuarios">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Usuarios</v-list-tile-title>
          </v-list-tile-content>
        </router-link>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed clipped-left app>
      <v-toolbar-side-icon v-if="this.loggedIn" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Lel Manager</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import AccountStore from "@/store/Account";

@Component({
  name: "App"
})
export default class App extends Vue {
  drawer: Boolean = true;

  get loggedIn() {
    return AccountStore.loggedIn;
  }

  get isAdmin() {
    return AccountStore.isAdmin
  }

  logout() {
    AccountStore.logout();
    this.$router.replace('Login')
  }
}
</script>
