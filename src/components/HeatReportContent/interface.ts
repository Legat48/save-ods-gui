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