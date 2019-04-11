const path = require("path");
const withPlugins = require("next-compose-plugins");
const withCustomBabelConfig = require("next-plugin-custom-babel-config");
const withTypescript = require("@zeit/next-typescript");
const withTranspileModules = require("next-plugin-transpile-modules");

module.exports = withPlugins(
  [
    withTranspileModules({
      transpileModules: ["@game"],
      babelConfigFile: path.resolve("../../babel.config.js")
    }),
    withTypescript(),
    withCustomBabelConfig
  ],
  {
    distDir: "../functions/next"
  }
);

// withCustomBabelConfig(
//   withTypescript(
//     withTranspileModules({
//       transpileModules: ["@game"],
//       babelConfigFile: path.resolve("../../babel.config.js")
//     })
//   )
// );
