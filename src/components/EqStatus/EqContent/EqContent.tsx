import { FC } from 'react';
import { eqStatusArr } from '../../../zod-scheme/eq-status';
import { z } from 'zod';
import { BaseTable } from '../../BaseTable';
import { headersBunker, headersTA } from '../../../static/eq-status-headers';



// Извлечение типа из схемы
interface EqContentProps {
  eqStatus: z.infer<typeof eqStatusArr>;
}


function selectClass(key: string, arr: string[], classItem: string): string {
  return arr.includes(key) ? classItem : '';
}

function generateClassTd(key: string, keyNumberArr: string[], value: number | string = ''): string {
  const classSet = new Set<string>();

  if (selectClass(key, keyNumberArr, 'table__item-content_number') === 'table__item-content_number') {
    classSet.add('table__item-content_number');
    if (typeof value === 'number' && value < 0) {
      classSet.add('table__item-content_alert');
    }
  }
  return [...classSet].join(' ');
}

export const EqContent: FC<EqContentProps> = ({ eqStatus }) => {
  const keyNumberArr = ['bin_net_wgt', 'remain_wgt', 'batch_id', 'remain_wgt_pim', 'remain_len_pim', 'batch_no_extra', 'remain_len', 'run_m_wgt', 'run_m_wgt_fill', 'coil_net_wgt', 'coil_len'];
  const keyPercentArr: string[] = [];
  const keyDateArr: string[] = [];
  const editRow = false;
  const sortEquipment = (equipment: any[]) => {
    return equipment.sort((a, b) => {
      const aIndex = parseInt(a.eq_name.match(/(\d+)$/)[0], 10);
      const bIndex = parseInt(b.eq_name.match(/(\d+)$/)[0], 10);
      if (a.eq_type === 6) {
        return aIndex - bIndex;
      } else {
        return a.eq_name.localeCompare(b.eq_name, undefined, { numeric: true });
      }
    });
  };
  return (
    <div className="card-wrap-eq">
      {eqStatus.map((item, index) => (
        <div className="card-wrap-eq__row" key={index}>
          <div className="card-wrap-eq__title">{item.unit_name}</div>
          {
          item &&
          <div className="card-wrap-eq__table">
            <BaseTable
              headers={headersBunker}
              contentArr={sortEquipment(item.unit_equipment.filter(e => e.eq_type === 7))}
              keyNumberArr={keyNumberArr}
              keyPercentArr={keyPercentArr}
              keyDateArr={keyDateArr}
              editRow={editRow}
              firstTdFunc={() => { }}
              classTdFunc={generateClassTd}
              classTrFunc={() => { return ''}}
              rowFunc={() => { }}
              keyUpdateArr={[]}
              maxHeight={false}
              fixedColum={true}
              gridColum={`repeat(${headersBunker.length}, 1fr)`}
            />
          </div>
          }
          {
          item &&
          <div className="card-wrap-eq__table">
            <BaseTable
              headers={headersTA}
              contentArr={sortEquipment(item.unit_equipment.filter(e => e.eq_type === 6))}
              keyNumberArr={keyNumberArr}
              keyPercentArr={keyPercentArr}
              keyDateArr={keyDateArr}
              editRow={editRow}
              firstTdFunc={() => { }}
              classTdFunc={generateClassTd}
              classTrFunc={() => { return ''}}
              rowFunc={() => { }}
              keyUpdateArr={[]}
              maxHeight={false}
              fixedColum={false}
              gridColum={`repeat(${headersBunker.length}, 1fr)`}
            />
          </div>
          }
        </div>
      ))}
    </div>
  );
};