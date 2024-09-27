export interface ChemUnitParsed {
  title: string,
  max: number;
  min: number;
  aim: number | null;
  value: number
}

export interface ChemAsObject {
  [key: string]: ChemUnitParsed;
}