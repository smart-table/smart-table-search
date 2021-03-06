import {pointer} from 'smart-table-json-pointer';
import {SearchConfiguration, SearchFunction} from './interfaces';
import {re} from 're-template-tag';

export interface RegexSearchInput extends SearchConfiguration {
    escape?: boolean;
    flags?: string;
}

export const regexp = <T>(input: RegexSearchInput): SearchFunction<T> => {
    const {value, scope = [], escape = false, flags = ''} = input;
    const searchPointers = scope.map(field => pointer<T>(field).get);
    if (scope.length === 0 || !value) {
        return (array: T[]): T[] => array;
    }
    const regex = escape === true ? re`/${value}/${flags}` : new RegExp(value, flags);
    return (array: T[]): T[] => array.filter(item => searchPointers.some(p => regex.test(String(p(item)))));
};
