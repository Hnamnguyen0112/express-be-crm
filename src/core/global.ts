import * as Promise from 'bluebird';
import logger from '../config/logger';

export default function initGlobal() {
  global.logger = logger;
  global.Promise = <any>Promise;
}
