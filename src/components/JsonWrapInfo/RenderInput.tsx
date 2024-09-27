import React from 'react';
import { Button, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface Item {
  paramName: string;
  paramDescription?: string;
  paramType?: string;
}

interface RenderInputProps {
  selectedItem: Item[];
  inputValue: string;
  handleInputChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: ( paramName: any) => void;
}

const RenderInput: React.FC<RenderInputProps> = ({
  selectedItem,
  inputValue,
  handleInputChanges,
  handleInputChange
}) => {
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, paramName: any) => {
    if (event.key === 'Enter') {
      selectedItem.forEach(item => {
        dataToSend[item.paramName] = inputValue;
        handleInputChange(item.paramName);
      });
    }
  };
  const getMaxLength = (paramType: any) => {
    const match = paramType.match(/string\((\d+)\)/)
    return match ? parseInt(match[1]) : null
  }

  if (!selectedItem || selectedItem.length < 2) return null;

  const fixedWidth = '200px';
  const fixedHeight = '56px';

  let dataToSend: Record<string, string> = {};
  return (
    <>
      {selectedItem
        .filter(item => item.paramName !== 'timestamp')
        .map((item, key) => (
          <div key={key}>
            {item.paramType === 'date' ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  ampm={false}
                  format="DD/MM/YY HH:mm"
                />
              </LocalizationProvider>
            ) : (
              <TextField
                size="medium"
                variant="outlined"
                placeholder={item.paramDescription}
                value={inputValue}
                onChange={handleInputChanges}
                onKeyUp={handleKeyUp}
                inputProps={{
                  maxLength: getMaxLength(item.paramType),
                }}
                style={{ width: fixedWidth, height: fixedHeight }}
              />
            )}
          </div>
        ))}
      <div>
        <Button
          variant="outlined"
          size="medium"
          onClick={(event) => {
            selectedItem.forEach(item => {
              dataToSend[item.paramName] = inputValue;
              handleInputChange(item.paramName)
            });
          }}

          style={{ width: fixedWidth, height: fixedHeight }}
        >
          Получить JSON
        </Button>
      </div>
    </>
  );
};

export default RenderInput;