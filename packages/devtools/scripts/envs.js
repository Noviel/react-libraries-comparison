#!/usr/bin/env node
const argv = require('yargs').argv

const { readEnv } = require('../lib/read-env');

console.log('envs', readEnv());
