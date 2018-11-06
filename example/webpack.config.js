import path from 'path'
import webpack from 'webpack'
import { VueLoaderPlugin } from 'vue-loader'

const DEV_SERVER_PORT = 3000
const PATH_TO_SRC = path.resolve(__dirname, 'src')
const PATH_TO_DEV_DIST = path.resolve(__dirname, 'public')
const PATH_TO_NODE_MODULES = path.resolve(__dirname, 'node_modules')

export default {
  mode: 'development',

  entry: './src/index.js',

  output: {
    path: PATH_TO_DEV_DIST,
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
        include: PATH_TO_SRC,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: PATH_TO_SRC,
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

  plugins: [
    new VueLoaderPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/,
      'element-ui/lib/locale/lang/en'
    ),
  ],

  // cheap-module-eval-source-map — original source (lines only) (rebuild faster)
  // eval-source-map — original source
  devtool: 'cheap-module-eval-source-map',

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
