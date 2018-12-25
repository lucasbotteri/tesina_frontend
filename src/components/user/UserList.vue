<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <v-toolbar color="primary" class="mt-3" dark>
        <v-toolbar-title>Usuarios</v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-list two-line>
          <UserCard
            v-for="user in users"
            :key="user._id"
            :user="user"
          ></UserCard>
        </v-list>
      </v-card>
      <v-dialog width="500" persistent v-model="showModalForm">
        <UserForm @cancel="closeModal"></UserForm>

        <v-btn color="secondary" slot="activator" dark fixed bottom right fab>
          <v-icon>add</v-icon>
        </v-btn>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserStore from "@/store/User";
import User from "@/model/User";

import UserCard from "@/components/user/UserCard.vue";
import UserForm from "@/components/user/UserForm.vue";

@Component({
  name: "UserList",
  components: { UserCard, UserForm }
})
export default class UserListVue extends Vue {
  showModalForm: Boolean = false;

  get users() {
    return UserStore.users;
  }

  get isUsersEmpty() {
    return UserStore.users.length === 0;
  }

  async fetchUsers() {
    await UserStore.fetchUsers();
  }

  closeModal() {
    this.showModalForm = false;
  }

  mounted() {
    this.fetchUsers()
  }
}
</script>



