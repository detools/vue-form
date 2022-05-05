const getRealPaths = plugin =>
  Array.isArray(plugin) ? [require.resolve(plugin[0]), ...plugin.slice(1)] : require.resolve(plugin)

module.exports = {
  presets: [[require.resolve('@babel/preset-env'), { modules: false }]],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-transform-runtime',
    'babel-plugin-dynamic-import-node',
    'babel-plugin-transform-vue-jsx',
    'babel-plugin-lodash',
    'babel-plugin-vue-jsx-sync',
    'babel-plugin-jsx-v-model',
  ].map(getRealPaths),
  env: {
    test: {
      presets: [require.resolve('@babel/preset-env')],
    },
  },
}
