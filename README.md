# smart-table-search

[![CircleCI](https://circleci.com/gh/smart-table/smart-table-search.svg?style=svg)](https://circleci.com/gh/smart-table/smart-table-search)

full text search factory: takes a configuration object and returns a function operating on arrays

## basic

### options

* scope: an array with pointers to the properties to search
* value: the value items should match
* isCaseSensitive: whether the search should be case sensitive (default: false)

### usage

```Javascript
import {basic} from 'smart-table-search';

const collection = [
  {a: 'woo', b: {c: 'foot'}},
  {a: 'foo', b: {c: 'w'}},
  {a: 'foo', b: {c: 'b'}},
];

const search = basic({value: 'w', scope: ['a', 'b.c']})

const output = search(collection);
// > [{"a": "woo", "b": {"c": "foot"}},{"a": "foo", "b": {"c": "w"}}]
```

## regexp

### options

* scope: an array with pointers to the properties to search
* value: the regex pattern items should match
* escape: whether special regexp syntax character should be escaped (default false)
* flags: a string with the flags to provide to the testing regexp (default '')

### usage

```Javascript
import {regexp} from 'smart-table-search';

const collection = [
  {a: 'Woo', b: {c: 'bar'}},
  {a: 'a', b: {c: 'w'}},
  {a: 'owo', b: {c: 'bar'}}
];
const search = regexp({value: '^w', scope: ['a', 'b.c'], flags: 'i'});
const output = search(collection)
// > [ {a: 'Woo', b: {c: 'bar'}}, {a: 'a', b: {c: 'w'}}
```