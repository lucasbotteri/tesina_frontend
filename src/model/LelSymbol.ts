export default class LelSymbol {
    public id: string;
    public name: string;
    public type: string;
    public description: string;
    public createdAt: Date;
    public updatedAt: Date;
    constructor(id: string, name: string, type: string, description: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
