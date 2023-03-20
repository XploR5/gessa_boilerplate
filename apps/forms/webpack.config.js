const { ModuleFederationPlugin } = require('webpack').container;
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const { dependencies } = require('../../package.json');

const _shared = {};
const depsBlacklist = ['gridstack'];

Object.keys(dependencies).forEach((d, i) => {
  if (depsBlacklist.includes(d)) return;

  _shared[d] = {
    singleton: true,
    eager: true,
    requiredVersion: dependencies[d],
  };
});

module.exports = (config, context) => {
  nrwlConfig(config);
  config.context = process.cwd();
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'forms',
      filename: 'remoteEntry.js',
      exposes: {
        // Module
        './app.tsx': './apps/forms/src/app/App.js',

        // Slice
        './grid': './apps/react-remote/src/app/pages/projects/store/index.ts',

        // Route
        './RoutingDemoConfig':
          './apps/react-remote/src/app/pages/projects/DemoConfig.tsx',
      },
      shared: {
        ..._shared,
      },
    })
  );
  config.optimization.runtimeChunk = false;
  config.output = {
    ...config.output,
    uniqueName: 'react-remote',
    publicPath: 'auto',
  };

  return config;
};
