import {pointer} from 'smart-table-json-pointer';
import {SearchConfiguration, SearchFunction} from './interfaces';

export interface BasicSearchInput extends SearchConfiguration {
    isCaseSensitive?: boolean;
}

export const basic = <T>(input: BasicSearchInput): SearchFunction<T> => {
    const {value, scope = [], isCaseSensitive = false} = input;
    const searchPointers = scope.map(field => pointer<T>(field).get);
    if (scope.length === 0 || !value) {
        return (array: T[]): T[] => array;
    }
    const test = isCaseSensitive === true ? String(value) : String(value).toLowerCase();
    return (array: T[]): T[] => array.filter(item => searchPointers.some(p => {
        let v = p(item);
        v = Array.isArray(v) ? v : [v];
        return v.some(e => {
            const str = isCaseSensitive === true ? String(e) : String(e).toLowerCase();
            return str.includes(test);
        })
    }));
};
