import babel from 'rollup-plugin-babel'

export default [
    // CommonJS
    {
        input: 'src/index.js',
        output: { file: 'lib/index.js', format: 'cjs', indent: false },
        plugins: [babel()]
    },
    // ES
    {
        input: 'src/index.js',
        output: { file: 'es/index.js', format: 'es', indent: false },
        plugins: [babel()]
    }
]
