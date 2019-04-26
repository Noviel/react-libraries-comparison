const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');

const { defaultContour } = require('./contour');

const contour = process.env.CONTOUR || defaultContour;

const getRootPath = () => path.resolve(__dirname, '../../..');

const readEnv = (absoluteEnvFilePath = path.resolve(getRootPath(), `.env.${contour}`)) => {
  try {
    const config = dotenv.parse(fs.readFileSync(absoluteEnvFilePath));
    for (let key in config) {
      process.env[key] = config[key];
    }
    return config;
  } catch (e) {
    console.warn(`No env file "${absoluteEnvFilePath}" was found.`);
    return {};
  }
};

module.exports.readEnv = readEnv;
module.exports.getRootPath = getRootPath;
