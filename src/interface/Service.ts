export default interface Service<T> {
    list: () => Promise<T[]>;
    /*
    get: (id: string) => Promise<T>;
    create: (t: T) => Promise<T>;
    update: (id: string, newT: T) => Promise<T>;*/
}

