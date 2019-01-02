<template>
    <v-layout row>
        <v-flex xs12 sm10 offset-sm1>
            <v-toolbar color="primary" class="mt-3" dark>
                <v-toolbar-title>Usuarios</v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-list two-line>
                    <ProjectCard
                            v-for="project in projects"
                            :key="project._id"
                            :project="project"
                    ></ProjectCard>
                </v-list>
            </v-card>
            <v-dialog width="500" persistent v-model="showModalForm">
                <ProjectForm @cancel="closeModal"></ProjectForm>

                <v-btn color="secondary" slot="activator" dark fixed bottom right fab>
                    <v-icon>add</v-icon>
                </v-btn>
            </v-dialog>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import ProjectStore from "@/store/Project";
    import Project from "@/model/Project";

    import ProjectCard from "@/components/project/ProjectCard.vue";
    import ProjectForm from "@/components/project/ProjectForm.vue";

    @Component({
        name: "ProjectList",
        components: { ProjectCard, ProjectForm }
    })
    export default class ProjectListVue extends Vue {
        showModalForm: Boolean = false;

        get projects() {
            return ProjectStore.projects;
        }

        get isProjectsEmpty() {
            return ProjectStore.projects.length === 0;
        }

        async fetchProjects() {
            await ProjectStore.fetchProjects();
        }

        closeModal() {
            this.showModalForm = false;
        }

        mounted() {
            this.fetchProjects()
        }
    }
</script>



