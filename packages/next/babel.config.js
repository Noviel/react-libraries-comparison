module.exports = function(api) {
  api.cache(true);

  const presets = [
    'next/babel',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ];

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ];

  return {
    presets,
    plugins,
  };
};
