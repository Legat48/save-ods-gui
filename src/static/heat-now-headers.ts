interface Header {
  key: string;
  name: string;
}

export const headers:Header[] = [
  { key: 'heat_no', name: 'Номер плавки' },
  { key: 'SCHED_CAST_UNIT', name: 'Суточное задание' },
  { key: 'ROUTE_SCHED', name: 'Маршрут план' },
  { key: 'ROUTE_FACT', name: 'Маршрут факт' },
  { key: 'ROUTE_FACT_SCHED', name: 'Маршрут факт+план' },
  { key: 'lastProcess', name: 'Последний процесс' },
  { key: 'LDL_NO', name: '№ стальковша' },
  { key: 'LDL_IDLE_TIME', name: 'Межплавочный простой' },
  { key: 'LDL_DUR', name: 'Стойкость с.к.' }
]