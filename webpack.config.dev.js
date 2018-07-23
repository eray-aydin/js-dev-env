import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
    debug: true,

    // sourcemap maps the minified/transpiled js back to original js.
    devtool: 'inline-source-map',

    // Allows the list of files to be displayed.
    noInfo: false,

    // __dirname is part of node.js (a global).
    entry: [
        path.resolve(__dirname, 'src/index')
    ],

    // Target could also be 'node' etc.
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: '/',
        filename: 'bundle.js'
    },

    // plugins for linting, catching errors
    plugins: [
      // Create HTML file that includes a reference to bundled js.
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: true
      })
    ],

    // loaders to handle different file types e.g. js, css, images etc.
    // loaders allow webpack to bundle all these file types by declaring import statements for the files.
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, loaders: ['style', 'css']}
        ]
    }
}
