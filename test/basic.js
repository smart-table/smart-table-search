import test from 'zora';
import {basic as search} from '../dist/bundle/module';

test('basic text search on all values (flat object)', t => {
  const collection = [
    {a: 'woo', b: 'foot'},
    {a: 'foo', b: 'w'},
    {a: 'foo', b: 'b'},
  ];
  const output = search({value: 'w', scope: ['a', 'b']})(collection);
  t.deepEqual(output, [
    {a: 'woo', b: 'foot'},
    {a: 'foo', b: 'w'}
  ]);
});

test('basic text search on all values (nested object)', t => {
  const collection = [
    {a: 'woo', b: {c: 'foot'}},
    {a: 'foo', b: {c: 'w'}},
    {a: 'foo', b: {c: 'b'}},
  ];
  const output = search({value: 'w', scope: ['a', 'b.c']})(collection);
  t.deepEqual(output, [
    {"a": "woo", "b": {"c": "foot"}},
    {"a": "foo", "b": {"c": "w"}}
  ]);
});

test('basic text search: do nothing when no scope is provided', t => {
  const collection = [
    {a: 'woo', b: 'foot'},
    {a: 'foo', b: 'w'},
    {a: 'foo', b: 'b'},
  ];
  const output = search({value: 'w'})(collection);
  t.deepEqual(output, collection);
});

test('basic text search: do nothing when no value is provided', t => {
  const collection = [
    {a: 'woo', b: 'foot'},
    {a: 'foo', b: 'w'},
    {a: 'foo', b: 'b'},
  ];
  const output = search({value: '', scope: ['a']})(collection);
  t.deepEqual(output, collection);
});

test('basic text search: case insensitive by default', t => {
  const collection = [
    {a: 'Woo', b: {c: 'foot'}},
    {a: 'foo', b: {c: 'w'}},
    {a: 'foo', b: {c: 'b'}},
  ];
  const output = search({value: 'W', scope: ['a', 'b.c']})(collection);
  t.deepEqual(output, [
    {"a": "Woo", "b": {"c": "foot"}},
    {"a": "foo", "b": {"c": "w"}}
  ]);
});

test('basic text search: case sensitive by default', t => {
  const collection = [
    {a: 'Woo', b: {c: 'foot'}},
    {a: 'foo', b: {c: 'w'}},
    {a: 'foo', b: {c: 'b'}},
  ];
  const output = search({value: 'W', scope: ['a', 'b.c'], isCaseSensitive: true})(collection);
  t.deepEqual(output, [
    {"a": "Woo", "b": {"c": "foot"}}
  ]);
});
