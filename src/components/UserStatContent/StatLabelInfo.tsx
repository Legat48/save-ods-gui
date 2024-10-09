import { FC } from 'react';
import { StatLabelProps } from './interface';
import { Button, ButtonGroup } from '@mui/material';

export const StatLabel: FC<StatLabelProps> = ({ labelArr, setIsCurrentStats, isCurrentStats }) => {
  return (
    <div className="stat-label">
      {labelArr.map((item, index) => (
        <label key={index} className="stat-label__label" style={{ maxWidth: `${item.maxWidth}px` }}>
          <div className="stat-label__label-title">{item.title}</div>
          <div className="stat-label__text">{item.value}</div>
        </label>
      ))}
      <div className='stat-label__button-group'>
        <ButtonGroup disableElevation variant="contained" color="primary" fullWidth>
          <Button
            disabled={!isCurrentStats}
            variant="outlined"
            sx={{
              borderColor: !isCurrentStats ? 'var(--color-ready) !important' : 'var(--color-btn-1)',
              borderRight: !isCurrentStats ? '' : 'none !important',
              color: !isCurrentStats ? 'var(--color-ready) !important' : 'var(--color-btn-1)',
              fontWeight: '500',
              borderRadius: '5px',
            }}
            onClick={() => setIsCurrentStats((prev: any) => !prev)}>Вчера</Button>
          <Button
            disabled={isCurrentStats}
            variant="outlined"
            sx={{
              borderColor: isCurrentStats ? 'var(--color-ready) !important' : 'var(--color-btn-1)',
              borderLeft: isCurrentStats ? '' : 'none !important',
              color: isCurrentStats ? 'var(--color-ready) !important' : 'var(--color-btn-1)',
              fontWeight: '500',
              borderRadius: '5px',
            }}
            onClick={() => setIsCurrentStats((prev: any) => !prev)}>Сегодня</Button>
        </ButtonGroup>
      </div >
    </div >
  );
};
