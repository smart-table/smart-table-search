'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var pointer = _interopDefault(require('smart-table-json-pointer'));

function index (searchConf = {}) {
	const {value, scope = []} = searchConf;
	const searchPointers = scope.map(field => pointer(field).get);
	if (scope.length === 0 || !value) {
		return array => array;
	}
	return array => array.filter(item => searchPointers.some(p => String(p(item)).includes(String(value))));
}

module.exports = index;
