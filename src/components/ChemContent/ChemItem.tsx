import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { ChemUnitParsed } from '../ApkContent/interface'


export const ChemItem: React.FC<ChemUnitParsed> = ({ min, max, value, aim, title }) => {
  // Рассчитываем положение и цвет
  let percentage = ((value - min) / (max - min)) * 100;
  if (percentage <= 6) {
    percentage = 6;
  }
  if (percentage > 94) {
    percentage = 94;
  }
  const interpolateColor = (value: number, min: number, max: number, aim: number | null): string => {
    const redColor = [255, 55, 60]; // RGB для #fe373c (красный)
    const greenColor = [42,	186, 74]; // RGB для #2aba4a (зелёный)

    // Если aim null, то берем среднее значение между min и max
    const target = aim !== null ? aim : (min + max) / 2;
    const value1 = target + (max - target) / 2
    const value2 = target - (target - min) / 2
    // Проверяем, близко ли значение к целевому значению
    if ((value1 > value && value > target) || (value2 < value && value < target)) {
      return `rgb(${greenColor[0]}, ${greenColor[1]}, ${greenColor[2]})`; // Зеленый
    } else {
      return `rgb(${redColor[0]}, ${redColor[1]}, ${redColor[2]})`; // Красный
    }
};
  const backgroundColor = interpolateColor(value, min, max, aim);
  let aimPosition = 50
  if (aim) {
    aimPosition = 100 - (((aim - min) / (max - min)) * 100);
  }

  return (
    <div className='chem-item'>
      <div className='chem-item__title'>
        {title}
      </div>
      <div className={max < value ? 'chem-item__text chem-item__text_alert' : 'chem-item__text'}>
        {/* округление до 5 знаков после запятой */}
        {parseFloat(max.toFixed(5))}
      </div>
      <div
        className={`chem-item__wrap-img ${aim ? 'chem-item__wrap-img_aim' : ''}`}
      >
        {aim && <Tooltip className='chem-item__icon' title={`Цель${aim}`} arrow style={{ position: 'absolute', top: `${aimPosition}%` }}>
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 -9.53674e-07L0.5 14L11.5 7L0.5 -9.53674e-07Z" fill="rgba(71, 220, 104, 1)" />
          </svg>
        </Tooltip>}

        <div className="chem-item__wrap-hidden">
          <Box
            sx={{
              height: '100%',
              background: `linear-gradient(180deg, rgba(254, 55, 60, 1) 0%, rgba(71, 220, 104, 0.9) ${aimPosition - 2}% , rgba(71, 220, 104, 1) ${aimPosition}% ,rgba(71, 220, 104, 0.9) ${aimPosition + 2}%,  rgba(254, 55, 60, 1) 100%)`
            }}
          />
          <Typography
            sx={{
              position: 'absolute',
              inset: `auto 0 ${percentage}% 0`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px 6px', // Паддинг вокруг значения
              borderTop: `2px solid ${value > max || value < min ?  'rgba(254, 55, 60, 1)' : 'var(--color-border-1-dark)'}`,
              borderBottom: `2px solid ${value > max || value < min ? 'rgba(254, 55, 60, 1)' : 'var(--color-border-1-dark)' }`,
              width: '100%',
              fontSize: '14px',
              fontWeight: 'bold',
              color: backgroundColor,
              backgroundColor: '#fff', // Фон для значения
              transform: 'translateY(50%)',
            }}
          >
            {value}
          </Typography>
        </div>

      </div>
      <div className={min > value ? 'chem-item__text chem-item__text_alert' : 'chem-item__text'}>
        {parseFloat(min.toFixed(5))}
      </div>
    </div>
  );
};