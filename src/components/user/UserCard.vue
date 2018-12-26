<template>
  <v-card flat>
    <v-list-tile>
      <v-layout align-center justify-space-between row>
        <v-list-tile-content>
          <v-list-tile-title>{{this.user.email}}</v-list-tile-title>
        </v-list-tile-content>
        <v-btn @click.prevent="removeUser()" icon>
          <v-icon color="red">delete</v-icon>
        </v-btn>
      </v-layout>
    </v-list-tile>
    <v-divider></v-divider>
  </v-card>
</template>

    <script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import UserStore from "@/store/User";
import User from "@/model/User";
import Const from "@/constants";

@Component({
  name: "UserCard"
})
export default class UserCardVue extends Vue {
  @Prop({ type: Object, required: true })
  user: User;

  async removeUser() {
    await UserStore.removeUser(this.user.id);
    return this.user.id;
  }
}
</script>



