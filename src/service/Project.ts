import Api from '@/api/Axios';
import Project from '@/model/Project';


export async function list(): Promise<Project[]> {
    const response = await Api.getInstance().get('/project/');
    const data = response.data.data;
    return data.map((d: any) => new Project(d.id, d.name, d.createdAt, d.updatedAt));
}

export async function get(projectId: string): Promise<Project> {
    const response = await Api.getInstance().get(`/project/${projectId}`);
    const data = response.data;
    return new Project(data.id, data.name, data.createdAt, data.updatedAt);
}

export async function save(project: Project): Promise<Project> {
    const response = await Api.getInstance().post('/project/', project);
    const data = response.data;
    return new Project(data.id, data.name, data.createdAt, data.updatedAt);
}

export async function remove(projectId: string): Promise<boolean> {
    const response = await Api.getInstance().delete(`/project/${projectId}`);
    const data = response.data;
    return true;
}


export default {
    list,
    get,
    save,
    remove,
};
