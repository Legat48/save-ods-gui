import { FC, useState, useEffect } from 'react';
import { BaseTable } from '../BaseTable';
import { headers } from '../../static/heat-now-headers';

import { createTable, createNowArr } from './function'
import { TableItem } from './interface';
import { Heat } from '../../zod-scheme/heat';



// Извлечение типа из схемы
interface DataProps {
  data: Heat[]
}

export const HeatNowContent: FC<DataProps> = ({ data }) => {
  const keyNumberArr: string[] = ['LDL_NO', 'LDL_IDLE_TIME', 'LDL_DUR'];
  const keyPercentArr: string[] = [];
  const keyDateArr: string[] = [];
  const editRow: boolean = false;

  const [tableArr, setTableArr] = useState<TableItem[]>([]);
  const [nowArr, setNowArr] = useState<Set<string | number>>(new Set());

  // для присваивания ячейкам универсальной таблицы дополнительных классов
  function generateClassTd(key: string, keyNumberArr: string[], value: number | string = ''): string {
    function selectClass(key: string, arr: string[], classItem: string): string {
      return arr.includes(key) ? classItem : '';
    }
    const classSet = new Set<string>();

    if (selectClass(key, keyNumberArr, 'table__item-content_number') === 'table__item-content_number') {
      classSet.add('table__item-content_number');
      if (typeof value === 'number' && value < 0) {
        classSet.add('table__item-content_alert');
      }
    }
    return [...classSet].join(' ');
  }

  useEffect(() => {
    if (data) {
      setTableArr(createTable(data));
      setNowArr(createNowArr(data));
    }
  }, [data])

  function generateClassTr (unit: TableItem): string {
    const classArr: string[] = [];
    if(nowArr.has(unit.heat_no)){
      classArr.push('table__row_update');
    }
    return classArr.join(' ');
  }

  return (
    <div className="stat-wrap">
      <div className="stat-wrap__bot-wrap">
        {
          tableArr.length &&
          <div className="stat-wrap__bot-sub-wrap">
            <BaseTable
              maxHeight={`90vh`}
              headers={headers}
              contentArr={tableArr}
              keyNumberArr={keyNumberArr}
              keyPercentArr={keyPercentArr}
              keyDateArr={keyDateArr}
              editRow={editRow}
              firstTdFunc={() => { }}
              classTdFunc={generateClassTd}
              classTrFunc={generateClassTr}
              rowFunc={() => { }}
              keyUpdateArr={[]}
              fixedColum={false}
              gridColum={'auto'}
            />
          </div>
        }
      </div>
    </div>
  );
};