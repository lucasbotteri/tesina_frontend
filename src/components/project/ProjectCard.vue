<template>
  <v-card flat>
    <v-list-tile :to="redirect">
      <v-layout align-center justify-space-between row>
        <v-list-tile-content>
          <v-list-tile-title>{{this.project.name}}</v-list-tile-title>
        </v-list-tile-content>
        <v-btn @click.prevent="removeProject()" icon>
          <v-icon color="red">delete</v-icon>
        </v-btn>
      </v-layout>
    </v-list-tile>
    <v-divider></v-divider>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import ProjectStore from "@/store/Project";
import Project from "@/model/Project";
import Const from "@/constants";

@Component({
  name: "ProjectCard"
})
export default class ProjectCardVue extends Vue {
  @Prop({ type: Object, required: true })
  project: Project;

  redirect = {
    name: "project-detail",
    params: { id: this.project.id }
  };

  async removeProject() {
    await ProjectStore.removeProject(this.project.id);
    return this.project.id;
  }
}
</script>



