import { FC, useState, useEffect } from 'react';
import { BaseTable } from '../BaseTable';
import { headersUser } from '../../static/user-info-headers';

import { setOptionsUser, setStat, createTableRow } from './function'
import { StatLabel } from './StatLabelInfo';
import { LabelItem, OptionUser, TableItem } from './interface';



// Извлечение типа из схемы
interface DataProps {
  data: any
  setIsCurrentStats: any;
  isCurrentStats: any;
}

export const UserStatContent: FC<DataProps> = ({ data, setIsCurrentStats, isCurrentStats }) => {
  const keyNumberArr: string[] = ['totalCalls', 'totalMethod', 'totalInvalidCalls'];
  const keyPercentArr: string[] = [];
  const keyDateArr: string[] = [];
  const editRow: boolean = false;

  const [dataInfo, setDataInfo] = useState<OptionUser[]>([]);
  const [generalInfo, setGeneralInfo] = useState<LabelItem[]>([]);
  const [usersTableInfo, setUserTableInfo] = useState<TableItem[]>([]);

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
      const [info, users] = data;
      setDataInfo(setOptionsUser(info.result.stats, users.result.data));
      setGeneralInfo(setStat(info.result.stats));

      const userArr: TableItem[] = []
      if (dataInfo.length > 0) {
        dataInfo.forEach(item => {
          userArr.push(createTableRow(item))
        })
      }
      setUserTableInfo(userArr)
    }
  }, [data])
  useEffect(() => {
    if (dataInfo) {
      const userArr: TableItem[] = []
      if (dataInfo.length > 0) {
        dataInfo.forEach(item => {
          userArr.push(createTableRow(item))
        })
      }
      setUserTableInfo(userArr)
    }
  }, [dataInfo])

  return (
    <div className="stat-wrap">
      <div className="stat-wrap__top-wrap">
        {generalInfo && <StatLabel labelArr={generalInfo} setIsCurrentStats={setIsCurrentStats} isCurrentStats={isCurrentStats}/>}
      </div>
      <div className="stat-wrap__bot-wrap">
        {
          usersTableInfo.length &&
          <div className="stat-wrap__bot-sub-wrap">
            <BaseTable
              maxHeight={`calc(100vh - (var(--height-header) + 4px) - 117px)`}
              headers={headersUser}
              contentArr={usersTableInfo}
              keyNumberArr={keyNumberArr}
              keyPercentArr={keyPercentArr}
              keyDateArr={keyDateArr}
              editRow={editRow}
              firstTdFunc={() => { }}
              classTdFunc={generateClassTd}
              classTrFunc={() => { return ''}}
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