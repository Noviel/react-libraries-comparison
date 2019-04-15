const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCustomBabelConfig = require('next-plugin-custom-babel-config');
const withTypescript = require('@zeit/next-typescript');
const withTranspileModules = require('next-plugin-transpile-modules');

module.exports = withPlugins(
  [
    [withTypescript, {}],
    [
      withTranspileModules,
      {
        transpileModules: ['@game'],
      },
    ],
    [withCustomBabelConfig, { babelConfigFile: path.resolve('./babel.config.js') }],
  ],
  {
    env: {
      WEBPACK_VAR: 'webpack-injection-test',
    },
    distDir: '../functions-ssr/next',
    webpack: config => {
      config.module.rules.push({
        test: /\.worker\.(js|ts)$/,
        use: [
          {
            loader: require.resolve('worker-loader'),
            options: {
              name: 'static/[hash].worker.js',
              publicPath: '/_next/',
            },
          },
          {
            loader: 'babel-loader',
            options: {},
          },
        ],
      });
      // // Overcome webpack referencing `window` in chunks
      config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`;

      return config;
    },
  }
);
