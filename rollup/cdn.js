import node from 'rollup-plugin-node-resolve';

export default {
	input: './index.js',
	output: [{
		file: './dist/smart-table-search.js',
		format: 'iife',
		name: 'smartTableSearch',
		sourcemap: true
	}, {
		file: './dist/smart-table-search.es.js',
		format: 'es',
		sourcemap: true
	}],
	plugins: [node()]
}