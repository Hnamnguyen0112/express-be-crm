import core from './core';

const bootstrap = () => {
  core.initGlobal();
  core.createApp();
};

(() => {
  try {
    bootstrap();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
