export interface TableItem {
  heat_no: string, // Номер плавки
  SCHED_CAST_UNIT: string, // Суточное задание
  ROUTE_SCHED: string, // Маршрут план
  ROUTE_FACT: string, // Маршрут факт
  ROUTE_FACT_SCHED: string, // Маршрут факт+план
  lastProcess: string, // Последний процесс
}