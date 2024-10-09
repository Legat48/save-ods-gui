import { FC, useState } from 'react';
import { EmsDataType, EmsUnitObjType } from "../../zod-scheme/ems";
import { z } from 'zod';
import { EmsWrapCard } from "./EmsWrapCard";
import { Button } from '@mui/material';

interface EmsProps {
  emsData: EmsDataType;
}
function selectColor(item: EmsUnitObjType, selectId: number) {
  let color = 'var(--color-btn-1)'
  if (item.steel_type_id === selectId) {
    color = 'var(--color-ready) !important'
  }
  if (!item.cards || (item.cards && item.cards.length === 0)) {
    color = 'var(--color-error) !important'
  }
  return color
}

export const EmsContent: FC<EmsProps> = ({ emsData }) => {
  const [selectId, setSelectId] = useState(1);
  const selectedItem = emsData ? emsData.find(e => e.steel_type_id === selectId) : null;

  return (
    <>
      <div className="ems">
        <div className="ems__wrap-title">
          <h3 className="ems__title">
            Тип стали:
          </h3>
          {emsData && emsData.map((item, indexItem) => (
            <Button
              key={indexItem + `${item.steel_type_id}`}
              onClick={() => {
                setSelectId(item.steel_type_id)
              }}
              variant="outlined"
              size="large"
              disabled={item.steel_type_id === selectId}
              sx={{
                color: selectColor(item, selectId),
                backgroundColor: item.steel_type_id === selectId ? 'var(--color-bg-white-1) !important' : '#fff',
                borderColor: selectColor(item, selectId),
              }}
            >
              {item.steel_type_name}
            </Button>
          ))}
          <li className="ems__title-item"></li>
        </div>
        {
          selectedItem &&
          <EmsWrapCard emsUnitObjType={selectedItem} steelGradeId={selectId} />
        }
      </div>
    </>
  );
};