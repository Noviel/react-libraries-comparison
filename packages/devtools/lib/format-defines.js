module.exports.createDefinesFromProcess = (keys, prefix = `process.env.`, stringify = true) =>
  keys.reduce((acc, curr) => {
    const value = process.env[curr];
    acc[`${prefix}${curr}`] = stringify ? JSON.stringify(value) : value;
    return acc;
  }, {});

module.exports.createDefinesFromObject = (obj, prefix = `process.env.`, stringify = true) =>
  Object.keys(obj).reduce((acc, curr) => {
    const value = obj[curr];
    acc[`${prefix}${curr}`] = stringify ? JSON.stringify(value) : value;
    return acc;
  }, {});
