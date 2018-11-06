import path from 'path'
import webpack from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'
import CleanWebpackPlugin from 'clean-webpack-plugin'

const DEV_SERVER_PORT = 3000
const PATH_TO_SRC = path.resolve(__dirname, 'src')
const PATH_TO_VUE_FORM = path.resolve(__dirname, '..', 'VueForm')
const PATH_TO_DIST = path.resolve(__dirname, '..', 'docs')
const PATH_TO_DEV_DIST = path.resolve(__dirname, 'public')
const PATH_TO_NODE_MODULES = path.resolve(__dirname, '..', 'node_modules')

const CLEAN_OPTIONS = {
  // Instead of this ugly hack — we will get "wwwroot is outside of the project root. Skipping..."
  root: path.resolve(PATH_TO_DIST, '..'),
  exclude: ['index.html'],
  verbose: true,
  dry: false,
}

export default {
  mode: 'development',

  entry: path.resolve(PATH_TO_SRC, 'index.js'),

  output: {
    path: process.env.NODE_ENV !== 'production' ? PATH_TO_DEV_DIST : PATH_TO_DIST,
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': PATH_TO_SRC,
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
        test: /\.s[a|c]ss$/,
        use: [
          'style-loader', // CommonJS => Style nodes
          'css-loader', // CSS => CommonJS
          'sass-loader', // Sass => CSS
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
    new CleanWebpackPlugin(PATH_TO_DIST, CLEAN_OPTIONS),
  ],

  devServer: {
    port: DEV_SERVER_PORT,
    hotOnly: true,
    contentBase: [
      PATH_TO_DEV_DIST,
      path.resolve(PATH_TO_NODE_MODULES, 'element-ui/lib/theme-chalk'),
    ], // boolean | string | array, static file location
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
  },
}
