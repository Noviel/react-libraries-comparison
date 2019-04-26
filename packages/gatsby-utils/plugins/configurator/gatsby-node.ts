import webpack from 'webpack';

interface Opts {
  actions: any;
  loaders: any;
  getConfig: any;
}

export function resolvableExtensions() {
  return [`.ts`, `.tsx`];
}

export function onCreateBabelConfig({ actions }: any, options: any) {
  actions.setBabelPreset({
    name: `@babel/preset-typescript`,
    options,
  });
}

export function onCreateWebpackConfig({ actions, loaders, getConfig }: Opts, opts: any) {
  const prod = process.env.NODE_ENV === 'production';

  console.log(`Adjusting webpack config to ${process.env.NODE_ENV} environment...`);

  const config = getConfig();

  const modulesToTranspile = opts.modules;
  const jsLoader = loaders.js();

  if (!jsLoader) {
    return;
  }

  const excludeModulesRegex = new RegExp(
    `node_modules(?!(\\/|\\\\)(${modulesToTranspile.join('|').replace('/', '(\\/|\\\\)')})).*`,
    'i'
  );

  function exclude(modulePath: string) {
    const result = excludeModulesRegex.test(modulePath);
    return result;
  }

  config.module.rules = [
    ...config.module.rules.filter((rule: any) =>
      !prod ? true : String(rule.test) !== String(/\.mjs$/)
    ),
    {
      test: /\.tsx?$/,
      use: jsLoader,
    },
    {
      test: /\.worker\.(js|ts)$/,
      use: [
        {
          loader: 'worker-loader',
          options: {
            name: 'static/[hash].worker.js',
            publicPath: '/',
          },
        },
        jsLoader,
      ],
    },
    !prod
      ? {}
      : {
          use: jsLoader,
          test: /\.mjs$/,
          exclude,
        },
  ];

  config.output.globalObject = `(typeof self === 'undefined' ? this : self)`;

  actions.replaceWebpackConfig(config);
  actions.setWebpackConfig({
    plugins: [new webpack.DefinePlugin(opts.defines)],
  });
}
