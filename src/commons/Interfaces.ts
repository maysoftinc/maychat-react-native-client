export interface IFindResult<T> {
    total: number;
    limit: number;
    skip: number;
    data: T[];
}
