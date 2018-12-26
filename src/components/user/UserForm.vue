<template>
  <v-card>
    <v-card-title>
      <span class="headline">Nuevo Usuario</span>
    </v-card-title>

    <v-card-text>
      <form>
        <v-text-field
          v-validate="'required|email'"
          v-model="credential.email"
          :counter="20"
          :error-messages="errors.collect('email')"
          label="email"
          data-vv-name="email"
          required
        ></v-text-field>

        <v-text-field
          v-validate="'required'"
          v-model="credential.password"
          type="password"
          :error-messages="errors.collect('password')"
          label="password"
          data-vv-name="password"
          required
        ></v-text-field>

        <v-select
          v-validate="'required'"
          :items="roles"
          v-model="role"
          :error-messages="errors.collect('role')"
          label="Select"
          data-vv-name="role"
          required
        ></v-select>
      </form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="submit" color="blue darken-1" flat>Guardar</v-btn>
      <v-btn @click="clear" color="blue darken-1" flat>Limpiar</v-btn>
      <v-btn @click="cancel" color="red darken-1" flat>Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import UserStore from "@/store/User";
import User from "@/model/User";
import Const from "@/constants";
import router from "@/router";
import Credential from "@/interface/Credential";

@Component({
  name: "UserForm"
})
export default class UserDetail extends Vue {
  credential: Credential = { email: "", password: "" };
  role: string = "";
  roles = [
    {
      value: Const.USER_ROLE.ADMINISTRATOR,
      text: Const.USER_ROLE_READABLE.get(Const.USER_ROLE.ADMINISTRATOR)
    },
    {
      value: Const.USER_ROLE.REGULAR,
      text: Const.USER_ROLE_READABLE.get(Const.USER_ROLE.REGULAR)
    }
  ];

  clear() {
    this.credential.email = "";
    this.credential.password = "";
    this.role = "";
    this.$validator.reset();
  }

  @Emit()
  cancel() {
    this.clear();
  }

  async submit() {
    const validationPassed = await this.$validator.validateAll();
    if (validationPassed) {
      const semantic = await UserStore.saveUser({credential: this.credential, role: this.role});
      this.clear();
      this.$emit("cancel");
    }
  }
}
</script>



