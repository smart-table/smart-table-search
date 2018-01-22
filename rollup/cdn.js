import node from 'rollup-plugin-node-resolve';

export default {
	input: './index.js',
	output: {
		file: './dist/smart-table-search.js',
		format: 'iife',
		name: 'smartTableSearch',
		sourcemap: true
	},
	plugins: [node()]
}