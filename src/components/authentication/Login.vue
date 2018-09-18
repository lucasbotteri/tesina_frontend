<template>
  <v-container fluid fill-height align-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8 md4 >
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title >Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" name="mail" label="Mail" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" label="Contraseña" id="password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import {account} from '@/store/Account';

@Component({
  name: "Login"
})
export default class LoginVue extends Vue {
 async created() {
   await account.login({username: 'email@hotmail.com', password: '1234'})
 }
}
</script>



