import path from 'path'
import webpack from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const DEV_SERVER_PORT = 3000
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const PATH_TO_SRC = path.resolve(__dirname, 'src')
const PATH_TO_VUE_FORM = path.resolve(__dirname, '..', 'VueForm')
const PATH_TO_DIST = path.resolve(__dirname, '..', 'docs')
const PATH_TO_DEV_DIST = path.resolve(__dirname, 'public')
const PATH_TO_NODE_MODULES = path.resolve(__dirname, '..', 'node_modules')
const API_SERVER = 'http://localhost:33333'

const CLEAN_OPTIONS = {
  // Instead of this ugly hack — we will get "wwwroot is outside of the project root. Skipping..."
  root: path.resolve(PATH_TO_DIST, '..'),
  exclude: ['index.html', 'favicon.png'],
  verbose: true,
  dry: false,
}

const productionPlugins = [
  new CleanWebpackPlugin(PATH_TO_DIST, CLEAN_OPTIONS),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
]

export default {
  mode: 'development',

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
    // common
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
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
  },
}
