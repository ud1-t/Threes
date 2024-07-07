const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  module: {
    rules: [
      // Shaders
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader'
        ]
      }
    ]
  }
});
