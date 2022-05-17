const lint = require ('./lint');
const optionsForApi = require ('./eslintOptions');

module.exports = (api, option) => {
  const { lintOnSave } = option;
  const { pluginOptions: { cliLintRules } } = option;

  if (lintOnSave) {
    const allWarnings = lintOnSave === true || lintOnSave === 'warining';
    const allErrors = lintOnSave === 'error';
    const options = optionsForApi (api);

    api.chainWebpack ((webpackConfig) => {
      /* eslint-disable indent */
      webpackConfig.module.rule ('eslint')
          .test (/\.(vue|(j|t)sx?)$/)
          .pre ()
          .exclude
          .add (/node_modules/)
          .end ()
          .use ('eslint-loader')
          .loader (require.resolve ('eslint-loader'))
          .options (Object.assign (options, {
            emitWarning: allWarnings,
            emitError: allErrors
          }, cliLintRules));
        /* eslint-enable indent */
      });
  }

  api.registerCommand ('lint', {
    description: 'lint and fix source files',
    usage: 'vue-cli-service lint [options] [...files]',
    options: {
      '--format [formatter]': 'specify formatter (default: codeframe)',
      '--no-fix': 'do not fix errors or warnings',
      '--no-fix-warnings': 'fix errors, but do not fix warnings',
      '--max-errors [limit]':
          'specify number of errors to make build failed (default: 0)',
      '--max-warnings [limit]':
          'specify number of warnings to make build failed (default: Infinity)'
    },
    details: 'For more options, see https://eslint.org/docs/user-guide/command-line-interface#options'
  }, (args) => {
    lint (args, api);
  });
};
