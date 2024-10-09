import { useState, FC } from 'react';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { string } from 'zod';

interface CardSwitchProps {
  initialValue: number;
  attributeValues: {
    value_id: number,
    value_name: string,
  }[];
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

export const EmsSwitch: FC<CardSwitchProps> = ({ initialValue, attributeValues, disabled, onChange }) => {
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
        {attributeValues.map((item, index) => {
          return (
            <FormControlLabel key={index} value={item.value_id} control={<Radio />} label={item.value_name} disabled={disabled} />
          );
        })}
      </RadioGroup>
    </div>
  );
};