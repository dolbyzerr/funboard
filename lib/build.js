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
      { test: /\.styl$/, loader: ExtractTextPlugin.extract('css-loader!stylus') },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'baggage?index.styl!babel-loader'}
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true })
  ],
  resolve: {
    modulesDirectories: [
      'components',
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx']
  }
})