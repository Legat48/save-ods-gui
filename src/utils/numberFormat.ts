export function numberFormat(value: number | string): string {
  return new Intl.NumberFormat().format(typeof value === 'number' ? value : Number(value));
}

export function outputNumber(number: number | string): string {
  return number && typeof number === 'number' ? numberFormat(number) : `${number}`;
}