#!/usr/bin/env node
const yargs = require('yargs');
const shell = require('shelljs');

const { defaultContour } = require('../lib/contour');

const argv = yargs.options({
  contour: {
    description: `Target contour`,
    alias: `c`,
  },
  target: {
    description: `Target package`,
    alias: `t`,
    demand: true,
  },
}).argv;

const contour = argv.contour || defaultContour;
let production = argv.prod;

if (argv.contour === 'prod') {
  production = true;
}

shell.exec(
  `yarn run cross-env CONTOUR=${contour} ${
    production ? `NODE_ENV=production ` : ''
  }yarn workspace @project/${argv.target} build`
);
