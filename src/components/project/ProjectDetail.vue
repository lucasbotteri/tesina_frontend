<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1 class="mt-3">
      <v-container v-if="!this.loading">
        <v-card>
          <v-card-title>
            <h2 class="display-2 grey--text">{{this.project.name}}</h2>
          </v-card-title>
        </v-card>

        <LelSymbolList :projectId='this.project.id.toString()'>
        </LelSymbolList>

        </v-container>

      <v-progress-circular v-else indeterminate color="secondary"></v-progress-circular>
    </v-flex>
  </v-layout>
</template>

  <script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import ProjectStore from "@/store/Project";
import Project from "@/model/Project";
import LelSymbolList from "@/components/lelSymbol/LelSymbolList.vue";
import Const from "@/constants";
import { truncate } from "fs";

@Component({
  name: "ProjectDetail",
  components: { LelSymbolList }
})
export default class ProjectDetail extends Vue {
  project: Project;
  loading: Boolean = true;
  async created() {
    this.fetchProjects();
  }

  async fetchProjects() {
    this.project = await ProjectStore.fetchProject(this.$route.params.id);
    this.loading = false;
  }

  @Watch("$route")
  onRouteChange(to: string, from: string) {
    this.loading = true;
    this.fetchProjects();
  }
}
</script>



