import { FC, useState } from 'react';
import SortSvg from '../../assets/sort.svg?react'
import { outputNumber } from '../../utils/numberFormat';
import { sortArray } from './sortArray';
interface BaseTable {
  firstTdFunc: () => void;
  classTdFunc: (key: string, unit: any, value: number | string) => string;
  classTrFunc: ( unit: any ) => string;
  rowFunc: () => void;
  keyUpdateArr: string[];
  keyNumberArr: string[];
  keyPercentArr: string[];
  keyDateArr: string[];
  headers: any[];
  contentArr: any[];
  editRow: boolean;
  fixedColum: boolean;
  gridColum: string;
  maxHeight: string | boolean;
}

export const BaseTable: FC<BaseTable> = ({
  firstTdFunc = () => { },
  classTdFunc = () => { },
  classTrFunc = () => { },
  rowFunc = () => { },
  keyUpdateArr = [],
  keyNumberArr = [],
  keyPercentArr = [],
  keyDateArr = [],
  headers = [],
  contentArr = [],
  editRow = false,
  fixedColum = false,
  gridColum = 'auto',
  maxHeight = false
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<number>(0);
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 1 ? -1 : 1);
    } else {
      setSortKey(key);
      setSortDirection(1);
    }
  };


  const sortedContentArr = sortKey
    ? sortArray(contentArr, sortKey, sortDirection)
    : contentArr;
    return (
          <div className="table-container" style={{ maxHeight: maxHeight ? `${maxHeight}` : '' }}>
            <table className='table' style={{display : fixedColum? 'grid' : 'table'}}>
              <thead>
                <tr className='table__row table__row_header' style={{display : fixedColum? 'grid' : 'table-row', gridTemplateColumns: gridColum, height: fixedColum? 'auto': '' }} >
                  {headers.map((header, indexBunker) => (
                    <th key={indexBunker} className="table__item table__item_header" onClick={() => handleSort(header.key)}>
                      <div className="table__header-content">
                        {header.name}
                        {/* {header.key} */}
                        <SortSvg></SortSvg>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedContentArr.map((unit, index) => (
                  <tr key={index} className={`table__row ${classTrFunc(unit)}`} style={{display : fixedColum? 'grid' : 'table-row', gridTemplateColumns: gridColum, height: fixedColum? 'auto': '', alignItems: 'center'}}>
                    {headers.map((header, indexBunker) => {
                      const value = (unit as any)[header.key];
                      const isNegative = value < 0;
                      const isKeyInArray = keyNumberArr.includes(header.key);
                      let cellClassName = isKeyInArray && isNegative ? 'table__item-content_alert' : '';
                      if (isKeyInArray) {
                        cellClassName = 'table__item-content_number'
                        if(isNegative) {
                          cellClassName = cellClassName + ' ' + 'table__item-content_alert'
                        }
                      }
                      return (
                        <td key={indexBunker} className='table__item '>
                          <div className={`table__item-content ${cellClassName}`}>
                            {value && outputNumber(value)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
};