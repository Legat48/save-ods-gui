import { FC } from 'react';
import { StatLabelProps } from './interface';

export const StatLabel: FC<StatLabelProps> = ({ labelArr }) => {
  return (
    <div className="stat-label">
      {labelArr.map((item, index) => (
        <label key={index} className="stat-label__label" style={{ maxWidth: `${item.maxWidth}px` }}>
          <div className="stat-label__label-title">{item.title}</div>
          <div className="stat-label__text">{item.value}</div>
        </label>
      ))}
    </div>
  );
};
