const path = require('path');
const withPlugins = require('next-compose-plugins');
const withCustomBabelConfig = require('next-plugin-custom-babel-config');
const withTypescript = require('@zeit/next-typescript');
const withTranspileModules = require('next-plugin-transpile-modules');

const { createDefinesFromObject } = require('@project/devtools/lib/format-defines');
const { readEnv } = require('@project/devtools/lib/read-env');

readEnv();

const app = require('./app.config');
const appConfig = app();

module.exports = withPlugins(
  [
    [withTypescript, {}],
    [
      withTranspileModules,
      {
        transpileModules: ['@project'],
      },
    ],
    [withCustomBabelConfig, { babelConfigFile: path.resolve('./babel.config.js') }],
  ],
  {
    env: {
      WEBPACK_VAR: 'webpack-injection-test',
      ...createDefinesFromObject(appConfig.variables, '', false),
    },
    distDir: '../functions-ssr/next',
    webpack: config => {
      config.module.rules.push({
        test: /\.worker\.(js|ts)$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              name: 'static/[hash].worker.js',
              publicPath: '/_next/',
              inline: true,
            },
          },
          {
            loader: 'babel-loader',
            options: {},
          },
        ],
      });
      // Overcome webpack referencing `window` in chunks
      config.output.globalObject = `(typeof self === 'undefined' ? this : self)`;

      return config;
    },
  }
);
