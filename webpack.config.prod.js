import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    debug: true,

    // sourcemap maps the minified/transpiled js back to original js.
    devtool: 'source-map',

    // Allows the list of files to be displayed.
    noInfo: false,

    // __dirname is part of node.js (a global).
    entry: {
        vendor: path.resolve(__dirname, 'src/vendor'),
        main: path.resolve(__dirname, 'src/index')
    },

    // Target could also be 'node' etc.
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js' // webpack knows to use the name of the entry point declared above.
    },

    // plugins for linting, catching errors
    plugins: [
      // Generate an external css file with a hash in the filename.
      new ExtractTextPlugin('[name].[contenthash].css'),

      // Hash the files using MD5 so that their names change when the content changes.
      new WebpackMd5Hash(),

      // Use CommonsChunkPlugin to create a separate bundle
      // of vendor libraries so that they're cached separately.
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // Create HTML file that includes a reference to bundled js.
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        inject: true
      }),

      // Eliminate duplicate packages when bundling.
      new webpack.optimize.DedupePlugin(),

      // Minify JS
      new webpack.optimize.UglifyJsPlugin()
    ],

    // loaders to handle different file types e.g. js, css, images etc.
    // loaders allow webpack to bundle all these file types by declaring import statements for the files.
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
        ]
    }
}
