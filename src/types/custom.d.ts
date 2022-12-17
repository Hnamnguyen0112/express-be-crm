import * as Bluebird from 'bluebird';

declare global {
  var logger: any;
  export interface Promise<T> extends Bluebird<T> {}
}
