const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const { createDefinesFromProcess } = require('@project/devtools/lib/format-defines');
const { readEnv } = require('@project/devtools/lib/read-env');

readEnv();

const production = process.env.NODE_ENV === 'production';
const buildTimeDefineKeys = [];

module.exports = {
  mode: production ? 'production' : 'development',
  entry: './src/index.ts',
  target: 'node',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  plugins: [new webpack.DefinePlugin(createDefinesFromProcess(buildTimeDefineKeys))],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules\/(?!(@project)\/).*/,
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json'),
        },
      },
    ],
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve('../../node_modules'),
      whitelist: [/@project\//],
    }),
  ],
};
