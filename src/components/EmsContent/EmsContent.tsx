import { FC, useState } from 'react';
import { emsDataArr, EmsUnitObjType } from "../../zod-scheme/ems";
import { z } from 'zod';
import { EmsWrapCard } from "./EmsWrapCard";
import { Button } from '@mui/material';

interface EmsProps {
  emsData: z.infer<typeof emsDataArr>;
}
function selectColor(item: EmsUnitObjType, selectId: number) {
  let color = 'var(--color-btn-1)'
  if (item.typeSteelId === selectId) {
    color = 'var(--color-ready) !important'
  }
  if (item.settingArr && item.settingArr.length === 0) {
    color = 'var(--color-error) !important'
  }
  return color
}

export const EmsContent: FC<EmsProps> = ({ emsData }) => {
  const [selectId, setSelectId] = useState(0);
  const selectedItem = emsData ? emsData.find(e => e.typeSteelId === selectId) : null;

  return (
    <>
      <div className="ems">
        <div className="ems__wrap-title">
          <h3 className="ems__title">
            Тип стали:
          </h3>
          {emsData && emsData.map((item, indexItem) => (
            <Button
              key={indexItem + `${item.typeSteelId}`}
              onClick={() => {
                setSelectId(item.typeSteelId)
              }}
              variant="outlined"
              size="large"
              disabled={item.typeSteelId === selectId}
              sx={{
                color: selectColor(item, selectId),
                backgroundColor: item.typeSteelId === selectId ? 'var(--color-bg-white-1) !important' : '#fff',
                borderColor: selectColor(item, selectId),
              }}
            >
              {item.nameSteel}
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