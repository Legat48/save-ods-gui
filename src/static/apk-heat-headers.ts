interface Header {
  key: string;
  name: string;
}

export const headers:Header[] = [
  { key: 'unit ', name: 'Агрегат' },
  { key: 'ROUTE_FACT_SCHED', name: 'Маршрут факт+план' },
  { key: 'GRADE_LF', name: 'Марка' },
]