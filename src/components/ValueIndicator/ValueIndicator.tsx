import React from 'react';
import { Box, Typography } from '@mui/material';
import { ChemUnitParsed } from '../ApkContent/interface'


export const ValueIndicator: React.FC<ChemUnitParsed> = ({ min, max, value, aim , title }) => {
  // Рассчитываем положение и цвет
  let percentage = ((value - min) / (max - min)) * 100;
  if (percentage <= 7) {
    percentage = 7;
  }
  if (percentage >= 93) {
    percentage = 1920;
  }
  const interpolateColor = (value: number, min: number, max: number): string => {
    const redColor = [255, 55, 60]; // RGB для #fe373c (красный)
    const greenColor = [71, 220, 104]; // RGB для #47dc68 (зелёный)

    // Нормализуем значение от 0 до 100
    const normalized = (value - min) / (max - min); // будет в диапазоне [0, 1]

    // Определяем, насколько близко значение к 50
    // Мы используем Math.abs, чтобы получить абсолютное отклонение от 0.5
    const deviationFromMid = Math.abs(normalized - 0.5);

    // Интерполируем цвет
    // Чем ближе к 50 (то есть 0.5), тем больше зеленого (разница будет меньше)
    // Обозначим `mix` как 1 - 2 * deviationFromMid для плавного перехода
    const mix = 1 - 2 * deviationFromMid;

    // Рассчитываем итоговый цвет
    const color = redColor.map((c, idx) => Math.round(c + (greenColor[idx] - c) * mix));

    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };
  const backgroundColor = interpolateColor(value, min, max);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '64px', // Ширина столбца
        height: '200px', // Высота столбца
        backgroundColor: '#fff',
        border: '2px solid var(--color-border-1)',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 5px',
      }}
    >
       <Typography variant="caption" align="center">
        {/* округление до 5 знаков после запятой */}
        {title}
      </Typography>
      <Typography variant="caption" align="center">
        {/* округление до 5 знаков после запятой */}
        {parseFloat(max.toFixed(5))}
      </Typography>
      <Box
        sx={{
          position: 'relative',
          flex: '1',
          backgroundColor: 'lightgray',
          borderRadius: '4px',
          width: '50px',
          overflow: 'hidden', // Скрывает часть, которая выходит за границы
          boxShadow: '1px 2px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Индикатор прогресса */}
        <Box
          sx={{
            height: '100%',
            background: 'linear-gradient(180deg, rgba(254, 55, 60, 0.8), rgba(71, 220, 104, 0.8), rgba(71, 220, 104, 0.8), rgba(254, 55, 60, 0.8))'
          }}
        />
        <Typography
          variant="body2"
          align="center"
          sx={{
            position: 'absolute',
            bottom: `${percentage}%`,
            left: '50%',
            transform: 'translate(-50%, 50%)', // Центрируем текст по горизонтали и вертикали
            fontWeight: 'bold',
            backgroundColor: '#fff', // Фон для значения
            borderRadius: '0px',
            color: backgroundColor,
            padding: '2px 6px', // Паддинг вокруг значения
          }}
        >
          {parseFloat(value.toFixed(5))}
        </Typography>
      </Box>
      <Typography variant="caption" align="center">
        {parseFloat(min.toFixed(5))}
      </Typography>
    </Box>
  );
};