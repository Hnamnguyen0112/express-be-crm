export default function initGlobal() {
  /* eslint-disable global-require */
  global.Promise = require('bluebird');
  /* eslint-enable global-require */
}
