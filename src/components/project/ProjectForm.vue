<template>
  <v-card>
    <v-card-title>
      <span class="headline">Nuevo Proyecto</span>
    </v-card-title>

    <v-card-text>
      <form>
        <v-text-field
          v-validate="'required|min:5'"
          v-model="project.name"
          :counter="20"
          :error-messages="errors.collect('name')"
          label="name"
          data-vv-name="name"
          required
        ></v-text-field>
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
import ProjectStore from "@/store/Project";
import Project from "@/model/Project";
import Const from "@/constants";
import router from "@/router";

@Component({
  name: "ProjectForm"
})
export default class ProjectDetail extends Vue {
  project: Project = new Project("", "", new Date(), new Date());

  clear() {
    this.project.name = "";
    this.$validator.reset();
  }

  @Emit()
  cancel() {
    this.clear();
  }

  async submit() {
    const validationPassed = await this.$validator.validateAll();
    if (validationPassed) {
      const semantic = await ProjectStore.saveProject(this.project);
      this.clear();
      this.$emit("cancel");
    }
  }
}
</script>



