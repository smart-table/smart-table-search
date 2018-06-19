import pointer from 'smart-table-json-pointer';
import {SearchInput, SearchFunction} from './interfaces';
import {re} from 're-template-tag';

interface RegexSearchInput extends SearchInput {
    escape?: boolean;
    flags?: string;
}

export const regexp = <T>(input: RegexSearchInput): SearchFunction<T> => {
    const {value, scope = [], escape = false, flags = ''} = input;
    const searchPointers = scope.map(field => pointer(field).get);
    if (scope.length === 0 || !value) {
        return (array: T[]): T[] => array;
    }
    const regex = escape === true ? re`/${value}/${flags}` : new RegExp(value, flags);
    return (array: T[]): T[] => array.filter(item => searchPointers.some(p => regex.test(String(p(item)))));
};