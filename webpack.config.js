const path = require('path');

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'lampix.js',
    library: ['lampix', 'physics'],
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
