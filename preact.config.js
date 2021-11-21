module.exports = (config, env, helpers, /* options */) => {
  const postCssLoaders = helpers.getLoadersByName(config, 'postcss-loader');
  postCssLoaders.forEach(({ loader }) => {
    if (!loader.options.postcssOptions.plugins) {
      loader.options.postcssOptions.plugins = [];
    }
    const plugins = loader.options.postcssOptions.plugins;
    
    // Add tailwind css at the top.
    plugins.unshift(require('tailwindcss'));
  });

  if (!env.isProd) {
    config.devServer.proxy = [
      {
        path: '/api/**',
        target: 'http://localhost:8081',
      },
      {
        path: '/api',
        target: 'http://localhost:8081',
      }
    ];
  }
  return config;
};