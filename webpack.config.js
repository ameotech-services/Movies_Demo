const path = require('path');

module.exports = {

  module: {
    rules: [

      {
        test: /\.svg$/,
        issuer: /\.(js|ts|jsx|tsx)$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
};