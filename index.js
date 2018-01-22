import pointer from 'smart-table-json-pointer';

export default function (searchConf = {}) {
	const {value, scope = []} = searchConf;
	const searchPointers = scope.map(field => pointer(field).get);
	if (scope.length === 0 || !value) {
		return array => array;
	}
	return array => array.filter(item => searchPointers.some(p => String(p(item)).includes(String(value))));
}
