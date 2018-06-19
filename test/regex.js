import test from 'zora';
import {regexp as search} from '../dist/src/regex';

test('regexp text search on all values (flat object)', t => {
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

test('regexp text search on all values (nested object)', t => {
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

test('regexp text search: do nothing when no scope is provided', t => {
  const collection = [
    {a: 'woo', b: 'foot'},
    {a: 'foo', b: 'w'},
    {a: 'foo', b: 'b'},
  ];
  const output = search({value: 'w'})(collection);
  t.deepEqual(output, collection);
});

test('regexp text search: do nothing when no value is provided', t => {
  const collection = [
    {a: 'woo', b: 'foot'},
    {a: 'foo', b: 'w'},
    {a: 'foo', b: 'b'},
  ];
  const output = search({value: '', scope: ['a']})(collection);
  t.deepEqual(output, collection);
});

test('regexp text search: match using regex pattern', t => {
  const collection = [
    {a: 'woo', b: {c: 'bar'}},
    {a: 'a', b: {c: 'w'}},
    {a: 'owo', b: {c: 'bar'}}
  ];
  const output = search({value: '^w', scope: ['a', 'b.c']})(collection);
  t.deepEqual(output, [
    {a: 'woo', b: {c: 'bar'}},
    {a: 'a', b: {c: 'w'}}
  ]);
});

test('regexp text search: should escape pattern special characters', t => {
  const collection = [
    {a: 'woo', b: {c: 'bar'}},
    {a: 'a', b: {c: 'w'}},
    {a: 'o^wo', b: {c: 'bar'}}
  ];
  const output = search({value: '^w', scope: ['a', 'b.c'], escape: true})(collection);
  t.deepEqual(output, [
    {a: 'o^wo', b: {c: 'bar'}}
  ]);
});

test('regexp text search: should use flags when provided', t => {
  const collection = [
    {a: 'Woo', b: {c: 'bar'}},
    {a: 'a', b: {c: 'w'}},
    {a: 'o^wo', b: {c: 'bar'}}
  ];
  const output = search({value: '^w', scope: ['a', 'b.c'], flags: 'i'})(collection);
  t.deepEqual(output, [
    {a: 'Woo', b: {c: 'bar'}},
    {a: 'a', b: {c: 'w'}}
  ]);
});
