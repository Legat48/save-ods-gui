import { FC, useState, useEffect } from 'react';

import { setChemUnits } from './function'
import { ChemUnitParsed } from './interface';
import { Heat } from '../../zod-scheme/heat';

import { ChemItem } from './ChemItem';

// Извлечение типа из схемы
interface DataProps {
  data: Heat
}

export const ChemContent: FC<DataProps> = ({ data }) => {
  const [chemArr, setChemHeat] = useState<ChemUnitParsed[]>([]);

  useEffect(() => {
    if (data) {
      setChemHeat(setChemUnits(data));
    }
  }, [data])

  return (
    <div className="chem-box">
      {chemArr && chemArr.length > 0 && chemArr.map((chemItem: ChemUnitParsed, chemIndex: number) => (
        <ChemItem key={chemIndex} min={chemItem.min} max={chemItem.max} value={chemItem.value} aim={chemItem.aim} title={chemItem.title} />
      ))}
    </div>
  );
};