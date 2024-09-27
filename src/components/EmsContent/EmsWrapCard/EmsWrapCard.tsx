import { FC } from 'react';
import { EmsUnitObjType } from "../../../zod-scheme/ems";
// import { z } from 'zod';
import { EmsCard } from "../EmsCard";



// Извлечение типа из схемы
interface EmsProps {
  emsUnitObjType: EmsUnitObjType;
  steelGradeId: number;
}

export const EmsWrapCard: FC<EmsProps> = ({ emsUnitObjType, steelGradeId }) => {
  return (
    <div className="card-wrap-ems">
      <div className="card-wrap-ems__wrap">
        {emsUnitObjType.settingArr && emsUnitObjType.settingArr.length > 0 && emsUnitObjType.settingArr.map((card, indexCard) => (
          <EmsCard card={card} key={indexCard + `${steelGradeId}`} steelGradeId={steelGradeId} />
        ))}
        {emsUnitObjType.settingArr && emsUnitObjType.settingArr.length === 0 && (
          <div className="card-wrap-ems__error">
            <div className="">
              Для выбранного типа стали нет предсозданных настроек.

            </div>
            <div className="">
              Обратитесь в поддержку для создания шаблона настроек
            </div>
          </div>
        )}
      </div>
    </div>
  );
};