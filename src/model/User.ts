export default class LelSymbol {
    public id: string;
    public email: string;
    public type: string;
    public createdAt: Date;
    public updatedAt: Date;
    constructor(id: string, email: string, type: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.email = email;
        this.type = type;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
