const cypress = process.env.CYPRESS_ENV;
const storybook = process.env.STORYBOOK;

if (cypress) {
  console.log(`Using dummy babel configuration for cypress`);
}

module.exports = cypress
  ? {}
  : storybook
  ? function(api) {
      console.log('Configuring babel for storybook');
      const presets = [
        [
          'module:@emotion/babel-preset-css-prop',
          {
            sourceMap: true,
            autoLabel: true,
          },
        ],
        ['@babel/preset-react'],
        ['@babel/preset-env'],
        ['@babel/preset-typescript'],
      ];
      const plugins = [
        ['@babel/plugin-proposal-optional-catch-binding'],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-object-rest-spread'],
      ];

      api.cache(() => storybook);

      return {
        presets,
        plugins,
      };
    }
  : function(api) {
      const presets = ['babel-preset-gatsby'];
      const plugins = [
        ['@babel/plugin-proposal-optional-catch-binding'],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-object-rest-spread'],
      ];

      api.cache(() => process.env.NODE_ENV === 'development');

      return {
        presets,
        plugins,
      };
    };
