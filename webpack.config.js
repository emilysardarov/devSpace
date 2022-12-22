const Dotenv = require('dotenv-webpack');
module.exports = {
  plugins: [new Dotenv()],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.jpeg$/,
        use: 'file-loader',
      },
    ],
  },
};
