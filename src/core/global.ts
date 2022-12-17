import logger from '../config/logger';

export default function initGlobal() {
  global.logger = logger;
}
