import { FC, useEffect } from 'react';

import { setHeat } from './function'
import { Heat } from '../../zod-scheme/heat';
import { StatLabel } from '../UserStatContent/StatLabelInfo';
import { ChemContent } from '../ChemContent';
import { ProcessContent } from '../ProcessContent';



// Извлечение типа из схемы
interface DataProps {
  data: Heat[]
}

export const HeatReportContent: FC<DataProps> = ({ data }) => {

  useEffect(() => {
    if (data) {
    }
  }, [data])

  return (
    <div className="heat-report">
      <h1>ЭКРАН НАХОДИТСЯ НА СТАДИИ РАЗРАБОТКИ!</h1>
      {data && data.length > 0 && data.map((heat: Heat, index: number) => (
        <div key={index}>
          <div className="">
            <ProcessContent data={heat}/>
          </div>
          <div className="" style={{ width: '750px' }}>
            <ChemContent data={heat} />
          </div>
          <StatLabel labelArr={setHeat(heat)} />
        </div>
      ))}
    </div>
  );
};