import { labelArrItem, Process, rcProcess } from './interface';
import { Heat } from '../../zod-scheme/heat';

import { getUniversal } from '../../api/dataHub';
import { useQuery } from "@tanstack/react-query";

export function setHeat(heat: Heat): labelArrItem[] {
  return [
    {
      title: 'Номер плавки',
      maxWidth: 170,
      value: heat.heat_no ? heat.heat_no : '',
    },
    {
      title: 'Марка стали для KV',
      maxWidth: 170,
      value: heat.GRADE_BOF ? heat.GRADE_BOF : '',
    },
    {
      title: 'Марка стали для УПК',
      maxWidth: 170,
      value: heat.GRADE_LF ? heat.GRADE_LF : '',
    },
    {
      title: 'Марка стали для УНРС',
      maxWidth: 170,
      value: heat.GRADE_CCM ? heat.GRADE_CCM : '',
    },
    {
      title: 'Гост для KV',
      maxWidth: 350,
      value: heat.STANDARD_BOF ? heat.STANDARD_BOF : '',
    },
    {
      title: 'Гост для УПК',
      maxWidth: 350,
      value: heat.STANDARD_LF ? heat.STANDARD_LF : '',
    },
    {
      title: 'Гост для УНРС',
      maxWidth: 350,
      value: heat.STANDARD_CCM ? heat.STANDARD_CCM : '',
    },
    {
      title: 'Note для УНРС',
      maxWidth: 170,
      value: heat.NOTE_CCM ? heat.NOTE_CCM : '',
    },
    {
      title: 'STEEL_CODE для KV1',
      maxWidth: 170,
      value: heat.STEELCODE_BOF1 ? heat.STEELCODE_BOF1 : '',
    },
    {
      title: 'STEEL_CODE для УНРС 678',
      maxWidth: 220,
      value: heat.STEELCODE_CCM ? heat.STEELCODE_CCM : '',
    },
    {
      title: 'TechNotes для KV',
      maxWidth: 170,
      value: heat.TECHNOTES_BOF ? heat.TECHNOTES_BOF : '',
    },
    {
      title: 'TechNotes для УПК',
      maxWidth: 170,
      value: heat.TECHNOTES_LF ? heat.TECHNOTES_LF : '',
    },
    {
      title: 'TechNotes для УНРС',
      maxWidth: 170,
      value: heat.TECHNOTES_CCM ? heat.TECHNOTES_CCM : '',
    },
    {
      title: 'ANALITICAL_PROGRAM для KV',
      maxWidth: 220,
      value: heat.ANALIT_PROG_BOF ? heat.ANALIT_PROG_BOF : '',
    },
    {
      title: 'ROUTE (маршрута) план',
      maxWidth: 330,
      value: heat.ROUTE_SCHED ? heat.ROUTE_SCHED : '',
    },
    {
      title: 'ROUTE (маршрут) факт',
      maxWidth: 330,
      value: heat.ROUTE_FACT ? heat.ROUTE_FACT : '',
    },
    {
      title: 'ROUTE факт+план',
      maxWidth: 330,
      value: heat.ROUTE_FACT_SCHED ? heat.ROUTE_FACT_SCHED : '',
    },
    {
      title: 'TechNotes для АЦВ',
      maxWidth: 170,
      value: heat.TECHNOTES_RH ? heat.TECHNOTES_RH : '',
    },
    {
      title: 'Гост для АЦВ',
      maxWidth: 330,
      value: heat.STANDARD_RH ? heat.STANDARD_RH : '',
    },
    {
      title: 'Марка стали для АЦВ',
      maxWidth: 170,
      value: heat.GRADE_RH ? heat.GRADE_RH : '',
    },
    {
      title: 'Суточное задание. Агрегат разливки',
      maxWidth: 250,
      value: heat.SCHED_CAST_UNIT ? heat.SCHED_CAST_UNIT : '',
    },
    {
      title: 'Тип стали (Steel_code)',
      maxWidth: 170,
      value: heat.STEEL_CODE ? heat.STEEL_CODE : '',
    },
    {
      title: 'УНРС. Планируемая скорость разливки (ручей 1)',
      maxWidth: 300,
      value: heat.SCHED_CAST_SPEED_STR1 ? heat.SCHED_CAST_SPEED_STR1 : '',
    },
    {
      title: 'УНРС. Планируемая скорость разливки (ручей 2)',
      maxWidth: 300,
      value: heat.SCHED_CAST_SPEED_STR2 ? heat.SCHED_CAST_SPEED_STR2 : '',
    },
    {
      title: 'Расчетная температура ликвидуса',
      maxWidth: 220,
      value: heat.LIQUIDUS_CALC ? heat.LIQUIDUS_CALC : '',
    },
    {
      title: 'Признак легирования Ca',
      maxWidth: 170,
      value: heat.ADD_CA ? heat.ADD_CA : '',
    },
    {
      title: 'Ширина сляба по первому ручью (задание из заказа)',
      maxWidth: 330,
      value: heat.WIDTH_TASK_STR1 ? heat.WIDTH_TASK_STR1 : '',
    },
    {
      title: 'Толщина сляба по первому ручью (задание из заказа)',
      maxWidth: 330,
      value: heat.THICK_TASK_STR1 ? heat.THICK_TASK_STR1 : '',
    },
    {
      title: 'Ширина сляба по второму ручью (задание из заказа)',
      maxWidth: 330,
      value: heat.WIDTH_TASK_STR2 ? heat.WIDTH_TASK_STR2 : '',
    },
    {
      title: 'Толщина сляба по второму ручью (задание из заказа)',
      maxWidth: 330,
      value: heat.THICK_TASK_STR2 ? heat.THICK_TASK_STR2 : '',
    },
    {
      title: 'Группа разливки на УНРС-9',
      maxWidth: 220,
      value: heat.TECH_KEY ? heat.TECH_KEY : '',
    },
    {
      title: 'Химсостав стали(требования) (As) Мышьяк',
      maxWidth: 300,
      value: heat.AS ? heat.AS : '',
    },
    {
      title: 'Химсостав стали(требования) (Sn) Олово',
      maxWidth: 300,
      value: heat.SN ? heat.SN : '',
    },
    {
      title: 'Химсостав стали(требования) (Sb) Сурьма',
      maxWidth: 300,
      value: heat.SB ? heat.SB : '',
    },
    {
      title: 'СХЕМА ПРОЦЕССА плавки APK3',
      maxWidth: 250,
      value: heat.HEAT_PROC_SCHEME_APK3 ? heat.HEAT_PROC_SCHEME_APK3 : '',
    },
    {
      title: 'Номер стальковша',
      maxWidth: 170,
      value: heat.LDL_NO ? heat.LDL_NO : '',
    },
    {
      title: 'Межплавочный простой ковша перед плавкой мин.',
      maxWidth: 250,
      value: heat.LDL_IDLE_TIME ? heat.LDL_IDLE_TIME : '',
    },
  ]
}

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
  return {
    heat_no: heat.heat_no,
  }
}

export const getDataHubSchema = async ({ queryKey }: { queryKey: any[] }) => {
  const [, [params, selectedFormats]] = queryKey;
  const response1 = await getUniversal('GetHeatList', params);
  const response2 = await getUniversal('GetLastChgHeatList', params);
  const newArr = new Set();

  if (response1.result.data.length && response2.result.data.length) {
    const arr = [...response1.result.data, ...response2.result.data];

    for (let item of arr) {
      const { heatNo } = item;

      if (heatNo && heatNo.length > 4) {
        try {
          const response = await getUniversal('GetHeatData', [{ key: 'p_heat_no', value: heatNo }]);

          const addDataIfValid = (processes: (Process | rcProcess)[]) => {
            if (processes?.length) {
              processes.forEach((j: Process | rcProcess) => {
                if (selectedFormats.includes(j.unit)) {
                  newArr.add(response.result.data);
                }
              });
            }
          };

          addDataIfValid(response.result.data.processes);
          addDataIfValid(response.result.data['scheduled processes']);
        } catch (e) {
          console.error(`Ошибка получения информации по плавке ${heatNo}`);
        }
      }
    }

    return [...newArr];
  }

  return [response1, response2];
};
