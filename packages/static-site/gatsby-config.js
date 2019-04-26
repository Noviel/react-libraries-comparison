/* eslint-disable */
const { createDefinesFromObject } = require('@project/devtools/lib/format-defines');
const { readEnv } = require('@project/devtools/lib/read-env');

readEnv();

const app = require('./app.config');
const appConfig = app();

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
});

module.exports = {
  siteMetadata: {
    title: `Project`,
    description: `Fullstack scalable project`,
    author: `Alexander <sonsnov> Semenchenko`,
  },
  plugins: [
    {
      resolve: require.resolve(`@project/gatsby-utils/plugins/configurator`),
      options: {
        defines: {
          ...createDefinesFromObject(appConfig.variables),
        },
        modules: [],
      },
    },
  ],
};
