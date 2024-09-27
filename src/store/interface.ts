import { eqStatusArr } from './../zod-scheme/eq-status';

export interface HeaderState {
  headerTitle: string;
  title: string;
}
export interface eqStatusState {
  eqStatus: typeof eqStatusArr,
}

/**
 * dataHubShemaState схема датахаба
 */
export interface Scheme {
  methodName: string;
  jsonSchema: Record<string, any>;
  jsonTitle: Record<string, string>;
}

interface BaseScheme extends Scheme { }

export interface dataHubShemaState {
  scheme: Record<string, Scheme> | null;
  baseScheme: BaseScheme[] | null;
}