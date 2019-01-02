export default class Project {
    public id: string;
    public name: string;
    public createdAt: Date;
    public updatedAt: Date;
    constructor(id: string, name: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
