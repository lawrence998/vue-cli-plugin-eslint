module.exports = (api) => {
  const options = {
    root: true,
    extends: ['plugin:vue/essential'],
    env: {
      node: true
    },
    parserOptions: {
      ecmaVersion: 2020
    },
    cache: true,
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  };

  if (api.hasPlugin ('babel') && !api.hasPlugin ('typescript')) {
    options.parserOptions = {
      parser: 'babel-eslint'
    };
  }

  options.extends.push('@winner-fed/win');
  options.extends.push('@winner-fed/win/vue');

  options.parserOptions = {
    sourceType: 'module',
    allowImportExportEverywhere: true
  };

  return options;
};
