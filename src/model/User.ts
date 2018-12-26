export default class LelSymbol {
    public id: string;
    public email: string;
    public role: string;
    public createdAt: Date;
    public updatedAt: Date;
    constructor(id: string, email: string, role: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
