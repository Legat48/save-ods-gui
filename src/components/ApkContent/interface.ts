export interface ChemUnitParsed {
  title: string,
  max: number;
  min: number;
  aim: number | null;
  value: number
}
export interface labelArrItem {
  title: string;
  value: string | number;
  maxWidth: number;
}

export interface Process {
  unit: string;
  proc_begin: string;
  proc_end: string;
  operation: any[];
}

export type rcProcess = Omit<Process, 'operation'>;



export interface TableRow {
  heat_no: number | string;
  ROUTE_FACT_SCHED: string;
  GRADE_LF: string;
}