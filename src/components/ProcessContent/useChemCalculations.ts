import { useMemo } from 'react';

/**
 * Калькуляция свойств для компонента химии ChemItem
 *  @param {number} percentage - место для отрисовки value 
 *  @param {string} backgroundColor - цвет для текста значения на прогрессбаре
 *  @param {number} aimPosition - позиция центра прогрессбара, по ней отрисовывается стрелка и изменяется фон прогрессбара
 */

interface ChemCalculations {
  percentage: number;
  backgroundColor: string;
  aimPosition: number;
}

export const useChemCalculations = (value: number, min: number, max: number, aim: number | null): ChemCalculations => {
  const percentage = useMemo(() => {
    let pct = ((value - min) / (max - min)) * 100;
    return Math.min(Math.max(pct, 6), 94);
  }, [value, min, max]);

  const backgroundColor = useMemo(() => {
    const redColor = [255, 55, 60];
    const greenColor = [42, 186, 74];

    const target = aim !== null ? aim : (min + max) / 2;

    const value1 = target + (max - target) / 2;
    const value2 = target - (target - min) / 2;

    return (value1 > value && value > target) || (value2 < value && value < target)
      ? `rgb(${greenColor[0]}, ${greenColor[1]}, ${greenColor[2]})`
      : `rgb(${redColor[0]}, ${redColor[1]}, ${redColor[2]})`;
  }, [value, min, max, aim]);

  const aimPosition = useMemo(() => {
    return aim ? 100 - (((aim - min) / (max - min)) * 100) : 50;
  }, [aim, min, max]);

  return { percentage, backgroundColor, aimPosition };
};