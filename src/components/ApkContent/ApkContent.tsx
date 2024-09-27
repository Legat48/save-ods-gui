import { FC, useEffect } from 'react';

import { setHeat } from './function'
import { Heat } from '../../zod-scheme/heat';
import { StatLabel } from '../UserStatContent/StatLabelInfo';
import { ChemContent } from '../ChemContent';



// Извлечение типа из схемы
interface DataProps {
  data: Heat[]
}

export const ApkContent: FC<DataProps> = ({ data }) => {

  useEffect(() => {
    if (data) {
    }
  }, [data])

  return (
    <div className="stat-wrap">
      {data && data.length > 0 && data.map((heat: Heat, index: number) => (
        <div key={index}>
          <ChemContent data={heat} />
          <StatLabel labelArr={setHeat(heat)} />
        </div>
      ))}
    </div>
  );
};