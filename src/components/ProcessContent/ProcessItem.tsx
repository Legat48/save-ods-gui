import React from 'react';
import { ProcessItemZ } from '../../zod-scheme/heat'
import { useMemo } from 'react';

interface DataProps {
  process: ProcessItemZ
}
function createDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
export const ProcessItem: React.FC<DataProps> = ({ process }) => {
  const dateBegin = useMemo(() => process.proc_begin ? createDate(process.proc_begin) : 'по н.в', [process.proc_begin])
  const dateEnd = useMemo(() => process.proc_end ? createDate(process.proc_end) : 'н.в', [process.proc_begin]);

  return (
    <div className='process-item'>
      <div className="process-item__label-title">
        Агрегат слежения {process.unit}
      </div>
      <div className="process-item__date-wrap">
        <div className="">
          В работе:
        </div>
        <div className="p">
          с {dateBegin}
        </div>
        <div className="p">
          по {dateEnd}
        </div>
      </div>
      {process.handlings && process.handlings.length > 0 && <div className="process-item__handlings-wrap">
        <div className="process-item__sub-title">
          Все обработки:
        </div>
        <div className="process-item__handlings-sub-wrap">
          {process.handlings.map((handling, index) =>
            <div key={index} className="process-item__handlings-item">
              <div className="process-item__date-wrap">
                <div className="">
                  {handling.type} на "{handling.sections}"
                </div>
                <div className="p">
                  Проводилась с {createDate(handling.hdl_begin)}
                </div>
                <div className="p">
                  по {handling.hdl_end ? createDate(handling.hdl_end) : 'н.вю'}
                </div>
              </div>
              {handling.NET_WEIGHT &&
                <div className=""> • Вес нетто - {handling.NET_WEIGHT}т</div>
              }
              {handling.WGHT_TASK &&
                <div className=""> • Задание на налив- {handling.WGHT_TASK}т</div>
              }
              {handling.W_T_HM &&
                <div className=""> • Вес тары ЧЗК - {handling.W_T_HM}т</div>
              }
              {handling.W_MODE &&
                <div className=""> • Режим взвешивания - {handling.W_MODE}</div>
              }
              {handling.W_IRON &&
                <div className=""> • Вес чугуна- {handling.W_IRON}</div>
              }
              {handling.T_BEFORE_TMT &&
                <div className=""> • Температура до обработки - {handling.T_BEFORE_TMT}</div>
              }
              {handling.S_BEFORE_TMT &&
                <div className=""> • Сера до обработки - {handling.S_BEFORE_TMT}</div>
              }
              {handling.S_AIM &&
                <div className=""> • Целевая сера - {handling.S_AIM}</div>
              }
              {handling.S_BEFORE_TMT &&
                <div className=""> • Сера до обработки - {handling.S_BEFORE_TMT}</div>
              }
              {handling.CALC_LIME &&
                <div className=""> • Расчетное значение извести - {handling.CALC_LIME}</div>
              }
              {handling.CALC_MG &&
                <div className=""> • Расчетное значение магния - {handling.CALC_MG}</div>
              }

              {handling.HM_LOT_NO &&
                <div className=""> • Номер налива  {handling.HM_LOT_NO}</div>
              }
              {handling.INJ_NO &&
                <div className=""> • Порядковый номер инжекции- {handling.INJ_NO}</div>
              }
              {handling.SQ_LIME &&
                <div className=""> • Суммарный расход извести - {handling.SQ_LIME}</div>
              }
              {handling.LANCE_A &&
                <div className=""> • Номер фурмы А - {handling.LANCE_A}</div>
              }
              {handling.DUR_A &&
                <div className=""> • Стойкость фурмы A - {handling.DUR_A}</div>
              }
              {handling.LANCE_B &&
                <div className=""> • Номер фурмы B - {handling.LANCE_B}</div>
              }
              {handling.DUR_B &&
                <div className=""> •  Стойкость фурмы B - {handling.DUR_B}</div>
              }
              {handling.WORKTIME_A &&
                <div className=""> • Общее горячее время работы фурмы А за кампанию - {handling.WORKTIME_A}</div>
              }
              {handling.WORKTIME_B &&
                <div className=""> • Общее горячее время работы фурмы B за кампанию - {handling.WORKTIME_B}</div>
              }
              {handling.DIVERTER_MODE &&
                <div className=""> • Режим дивертера - {handling.DIVERTER_MODE}</div>
              }
              {handling.N_FUR &&
                <div className=""> • Код активной фурмы - {handling.N_FUR}</div>
              }
              {handling.SKIM_CNT &&
                <div className=""> • Порядковый номер скачивания шлака - {handling.SKIM_CNT}</div>
              }
              {handling.BUB_CNT &&
                <div className=""> • Порядковый номер отдува шлака - {handling.BUB_CNT}</div>
              }
              {handling.C_MAT &&
                <div className=""> • Код отданного материала КЦ-2 - {handling.C_MAT}</div>
              }
              {handling.SCRAP_WEIGHT1 &&
                <div className=""> • Вес лома 1 - {handling.SCRAP_WEIGHT1}</div>
              }
              {handling.SCB_ID1 &&
                <div className=""> • Ид лотка 1 - {handling.SCB_ID1}</div>
              }
              {handling.SBC_ID2 &&
                <div className=""> • Ид лотка 2 - {handling.SBC_ID2}</div>
              }
              {handling.SUM_SCRAP_WEIGHT &&
                <div className=""> • Суммарный вес лома, т - {handling.SUM_SCRAP_WEIGHT}</div>
              }

              {handling.VOL_AR &&
                <div className=""> • Суммарный расход аргона - {handling.VOL_AR}</div>
              }
              {handling.VOL_N2 &&
                <div className=""> • Суммарный расход азота - {handling.VOL_N2}</div>
              }
              {handling.N_PB &&
                <div className=""> • Номер бункера отдачи сыпучих - {handling.N_PB}</div>
              }
              {handling.MAT_WEIGHT &&
                <div className=""> • Порядковый номер скачивания шлака - {handling.MAT_WEIGHT}</div>
              }
              {handling.SUM_SCRAP_WEIGHT &&
                <div className=""> • Суммарный вес лома, т - {handling.SUM_SCRAP_WEIGHT}</div>
              }
              {handling.VOL_O2 &&
                <div className=""> • Суммарный расход кислорода - {handling.VOL_O2}</div>
              }
              {handling.LANCE_NO &&
                <div className=""> • Номер фурмы - {handling.LANCE_NO}</div>
              }
              {handling.VOL_N2 &&
                <div className=""> • Суммарный расход азота - {handling.VOL_N2}</div>
              }

              {handling.AL &&
                <div className=""> • Химсостав стали(требования) (Al) - {handling.AL}</div>
              }

              {handling.MANUAL_INPUT &&
                <div className=""> • Ручной ввод - {handling.MANUAL_INPUT}</div>
              }

              {handling.FESI65 &&
                <div className=""> • Рекомендация по FeSi65 - {handling.FESI65}</div>
              }
            </div>)}
        </div>
      </div>}
    </div>
  );
};