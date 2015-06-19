import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default webpack({
  entry: {
    app: './lib/client.js'
  },
  output: {
    path: './public',
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.styl$/, loader: new ExtractTextPlugin('stylus') },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css", { allChunks: true })
  ],
  resolve: {
    modulesDirectories: [
      'views',
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx']
  }
})