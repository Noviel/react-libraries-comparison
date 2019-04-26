#!/usr/bin/env node
const yargs = require('yargs');
const shell = require('shelljs');

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

const contour = argv.contour;
const target = argv.target;

if (!contour) {
  throw new Error(`Unsupported contour ${contour}`);
}

// TODO: get from package info
function getHostingName(t) {
  if (t === 'site-main') {
    return `gatsby`;
  } else if (t === 'next') {
    return 'next';
  }

  return undefined;
}

function getDeployer(t) {
  if (t === 'functions-ssr') {
    return `functions`;
  }

  return 'hosting';
}

const hostingName = getHostingName(target);
const deployer = getDeployer(target);

if (!deployer) {
  throw new Error(`Can't get deploy method for target ${target}`);
}

if (deployer === 'hosting' && !hostingName) {
  throw new Error(`Can't get hosting name for target ${target}`);
}

function getOnly(d, h) {
  let base = `--only`;
  if (d === 'hosting') {
    return `${base} ${d}:${h}`;
  } else if (deployer === 'functions') {
    return `${base} ${d}`;
  }
}

const command = `firebase deploy --project ${argv.contour} ${getOnly(deployer, hostingName)}`;

if (deployer === 'functions') {
  shell.cd(`packages/${target}`);
}

shell.exec(command);
