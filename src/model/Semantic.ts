interface SymbolsReferenced {
    id: string;
    name: string;
}
export default class Semantic {
    public id: string;
    public type: string;
    public description: string;
    public createdAt: Date;
    public updatedAt: Date;
    public symbolsReferenced: SymbolsReferenced[];
    constructor(id: string, type: string, description: string, createdAt: Date, updatedAt: Date, symbolsReferenced: SymbolsReferenced[] = []) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
        this.symbolsReferenced = symbolsReferenced;
    }
}
