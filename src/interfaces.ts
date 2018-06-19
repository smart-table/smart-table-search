export interface SearchInput {
    value: string;
    scope: string[];
}

export type SearchFunction<T> = (array: T[]) => T[];