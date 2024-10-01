import { FC, useEffect } from 'react';

import { Heat, ProcessItemZ } from '../../zod-scheme/heat';
import { ProcessItem } from './ProcessItem';

// Извлечение типа из схемы
interface DataProps {
  data: Heat
}

export const ProcessContent: FC<DataProps> = ({ data }) => {

  useEffect(() => {
    if (data) {
    }
  }, [data])

  return (
    <div className="process-box">
      {data.processes && data.processes.length > 0 && data.processes.map((item: ProcessItemZ, index: number) => (
        <div className="process-box__item" key={index}>
          <ProcessItem process={item} />
        </div>
      ))}
    </div>
  );
};