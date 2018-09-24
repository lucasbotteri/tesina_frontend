<template>
  <v-container fluid fill-height align-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs12 sm8 md4 >
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title >Login</v-toolbar-title>
          </v-toolbar>

          <v-form @submit.prevent="login()">
            <v-card-text>
                <v-text-field v-model="credential.email" prepend-icon="person" name="mail" label="Mail" type="text"></v-text-field>
                <v-text-field v-model="credential.password" prepend-icon="lock" name="password" label="Contraseña" id="password" type="password"></v-text-field>
                <v-alert
                :value="this.wrongCredentials"
                transition="fade-transition"
                color="error"
              >
                Credenciales incorrectas
              </v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="login" color="primary">Login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { account } from "@/store/Account";
import Credential from "@/interface/Credential";

@Component({
  name: "Login"
})
export default class LoginVue extends Vue {
  credential: Credential = {
    email: "",
    password: ""
  };
  wrongCredentials: Boolean = false

  created() {}

  async login() {
    try {
      await account.login(this.credential);
      this.$router.replace('Home')
    } catch (error) {
      this.wrongCredentials = true
    }
  }
}
</script>



