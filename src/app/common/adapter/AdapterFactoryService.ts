export type AdapterFactoryOptions<T, U> = {
    name: string;
    callback(input?: U): Promise<T>;
};
