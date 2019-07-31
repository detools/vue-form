const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const DEV_SERVER_PORT = 3000
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const PATH_TO_SRC = path.resolve(__dirname, 'src')
const PATH_TO_VUE_FORM = path.resolve(__dirname, '..', 'VueForm')
const PATH_TO_DIST = path.resolve(__dirname, '..', 'docs')
const PATH_TO_DEV_DIST = path.resolve(__dirname, 'public')
const PATH_TO_NODE_MODULES = path.resolve(__dirname, '..', 'node_modules')
const API_SERVER = 'http://localhost:33333'

const CLEAN_OPTIONS = {
  cleanOnceBeforeBuildPatterns: [
    '**/*',
    '!index.html',
    '!200.html',
    '!favicon.png',
    '!cropped-Favicon_Nexxus-270x270.png',
    '!cropped-Favicon_Nexxus-180x180.png',
    '!cropped-Favicon_Nexxus-192x192.png',
    '!cropped-Favicon_Nexxus-32x32.png',
  ],
}

const productionPlugins = [
  new CleanWebpackPlugin(CLEAN_OPTIONS),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
]

module.exports = {
  mode: 'development',

  // cheap-module-eval-source-map — original source (lines only) (rebuild faster)
  // eval-source-map — original source
  devtool: 'cheap-module-eval-source-map',

  entry: path.resolve(PATH_TO_SRC, 'index.js'),

  output: {
    path: !IS_PRODUCTION ? PATH_TO_DEV_DIST : PATH_TO_DIST,
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': PATH_TO_SRC,
      '@detools/vue-form': PATH_TO_VUE_FORM,
    },
  },

  target: 'web',

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [PATH_TO_SRC, PATH_TO_VUE_FORM],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [PATH_TO_SRC, PATH_TO_VUE_FORM],
      },
      {
        test: /\.less$/,
        use: [
          !IS_PRODUCTION ? 'style-loader' : MiniCssExtractPlugin.loader, // CommonJS => Style nodes
          'css-loader', // CSS => CommonJS
          'less-loader', // Less => CSS
        ],
      },
      {
        test: /\.(png|jp(e?)g|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/,
      'element-ui/lib/locale/lang/en'
    ),
  ].concat(IS_PRODUCTION ? productionPlugins : []),

  devServer: {
    port: DEV_SERVER_PORT,
    hotOnly: true,
    contentBase: [
      PATH_TO_DEV_DIST,
      path.resolve(PATH_TO_NODE_MODULES, 'element-ui/lib/theme-chalk'),
    ], // boolean | string | array, static file location
    proxy: {
      '/upload': {
        target: API_SERVER,
        changeOrigin: true,
        secure: false,
      },
    },
    compress: false, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
    clientLogLevel: 'error',
    disableHostCheck: true,
  },
}
