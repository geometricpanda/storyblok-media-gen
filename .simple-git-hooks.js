module.exports = {
  'commit-msg': 'yarn commitlint --edit $1',
  'pre-commit': 'yarn lint-staged',
};
