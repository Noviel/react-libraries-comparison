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

shell.exec(
  `yarn build --prod -c ${contour} -t ${argv.target} && yarn deploy -c ${contour} -t ${argv.target}`
);
