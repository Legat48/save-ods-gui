import { numberFormat } from '../../utils/numberFormat';
import { Heat } from '../../zod-scheme/heat';
import { sortArray } from '../BaseTable/sortArray';

interface TableRow {
  heat_no: number | string;
  SCHED_CAST_UNIT: string; // или другой соответствующий тип
  ROUTE_SCHED: string;
  ROUTE_FACT: string;
  ROUTE_FACT_SCHED: string;
  LDL_NO: string;
  LDL_IDLE_TIME: string;
  LDL_DUR: string;
  lastProcess: string;
}
export function createTable(heatArr: Heat[]): any {
  const tableArr = new Set<TableRow>();
  heatArr.forEach((e) => {
    tableArr.add(createTableRow(e));
  });

  // Приводим массив к типу, который у нас есть

  const sortedArray = [...tableArr].sort((a, b) => {
    // Теперь мы можем использовать as для указания типа
    const aHeatNo = a.heat_no as number | string;
    const bHeatNo = b.heat_no as number | string;

    // Добавляем проверку на тип данных и соответствующую сортировку
    if (typeof aHeatNo === 'number' && typeof bHeatNo === 'number') {
      return -1 * (aHeatNo - bHeatNo);
    } else if (typeof aHeatNo === 'string' && typeof bHeatNo === 'string') {
      return -1 * aHeatNo.localeCompare(bHeatNo, 'ru-RU', { numeric: true });
    } else {
      return 0;
    }
  });

  return sortedArray;
}
/**
 * @param createNowArr -функция вернет список плавок у которых процесс не завершен (они находятся на оборудовании)
 * @returns
*/
export function createNowArr(heatArr: Heat[]): any {
  const arr = new Set<string>();
  heatArr.forEach((e) => {
    if(e.processes) {
      e.processes.forEach((p) => {
        if (!p.proc_end) {
          arr.add(e.heat_no);
        }
      })
    }
  });
  return arr;
}

export function createTableRow(heat: Heat): any {
  let lastProcess = 'Нет данных';
  if (heat["processes"] && heat["processes"].length > 0 && typeof (heat["processes"][heat["processes"].length - 1].unit) === 'string') {
    const unit = heat["processes"][heat["processes"].length - 1].unit;
    if (typeof unit === 'string') {
      lastProcess = unit;
    }
  }

  return {
    heat_no: heat.heat_no,
    SCHED_CAST_UNIT: heat.SCHED_CAST_UNIT,
    ROUTE_SCHED: heat.ROUTE_SCHED,
    ROUTE_FACT: heat.ROUTE_FACT,
    ROUTE_FACT_SCHED: heat.ROUTE_FACT_SCHED,
    LDL_NO: heat.LDL_NO,
    LDL_IDLE_TIME: heat.LDL_IDLE_TIME,
    LDL_DUR: heat.LDL_DUR,
    lastProcess
  }
}