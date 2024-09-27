import { useState, FC } from 'react';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface CardSwitchProps {
  initialValue: number;
  valueText: string[];
  disabled: boolean;
  onChange: (newValue: number) => void;
}


const useStyles = makeStyles((theme) => ({
  radioGroup: {
    '& .MuiFormControlLabel-root': {
      fontSize: '14px', // уменьшение размера шрифта
      height: '26px', // уменьшение высоты кнопки
    },
  },
}));

export const EmsSwitch: FC<CardSwitchProps> = ({ initialValue, valueText, disabled, onChange }) => {
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    if (!disabled) {
      onChange(parseInt(newValue, 10));
    }
  };

  return (
    <div
      className={`card-switch`}
    >
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={initialValue.toString()}
        name="radio-buttons-group"
        onChange={handleChange}
        className={classes.radioGroup}

      >
        {valueText.map((text, index) => {
          return (
            <FormControlLabel key={index} value={index.toString()} control={<Radio />} label={text} disabled={disabled} />
          );
        })}
      </RadioGroup>
    </div>
  );
};