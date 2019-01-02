import ProjectService from '@/service/Project';
import { BareActionContext, getStoreBuilder } from 'vuex-typex';
import { RootState } from '@/store/';
import Project from '@/model/Project';
import Credential from '@/interface/Credential';
export interface ProjectState {
    projects: Project[];
}


const initialState: ProjectState = {
    projects: [],
};


const builder = getStoreBuilder<RootState>().module('project', initialState);

const projectsGetter = builder.read(function projects(state: ProjectState) {
    return state.projects;
});

function setProjects(state: ProjectState, project: Project[]) {
    state.projects = project;
}

async function fetchProjects(context: BareActionContext<ProjectState, RootState>) {
    try {
        // could send context.state.added as parameter
        const projects = await ProjectService.list();
        projectStore.setProjects(projects);
        return projects;
    } catch (error) {
        console.log(error);
    }
}

async function fetchProject(context: BareActionContext<ProjectState, RootState>, projectId: string) {
    const projects = await ProjectService.get(projectId);
    return projects;
}

async function saveProject(context: BareActionContext<ProjectState, RootState>, project: Project) {
    const projectSaved = await ProjectService.save(project);
    context.state.projects.push(projectSaved);
    return projectSaved;
}

async function removeProject(context: BareActionContext<ProjectState, RootState>, projectId: string) {
    const result = await ProjectService.remove(projectId);
    // Remove element from array
    context.state.projects.splice(context.state.projects.findIndex((ls) => ls.id === projectId), 1);
    return result;
}

const stateGetter = builder.state();
const projectStore = {
    get state() {
        return stateGetter();
    },

    get projects() {
        return projectsGetter();
    },

    setProjects: builder.commit(setProjects),


    fetchProjects: builder.dispatch(fetchProjects),

    fetchProject: builder.dispatch(fetchProject),

    saveProject: builder.dispatch(saveProject),

    removeProject: builder.dispatch(removeProject),

};

export default projectStore;
