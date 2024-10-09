import React from 'react';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';

interface Button {
  value: string | number; // значение кнопки, может быть строкой или числом
  label: string; // метка кнопки
}

interface MultipleSelectProps {
  formats: string[]; // массив значений формата
  onFormatsChange: (newFormats: string[]) => void; // функция для изменения форматов
  buttons: Button[]; // массив кнопок
}

export const MultipleSelect: React.FC<MultipleSelectProps> = ({ formats, onFormatsChange, buttons }) => {
  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[], // должен соответствовать `formats`
  ) => {
    onFormatsChange(newFormats);
  };

  return (
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
    >
      {buttons.map(button => (
        <ToggleButton key={button.value} value={button.value}>
          {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};