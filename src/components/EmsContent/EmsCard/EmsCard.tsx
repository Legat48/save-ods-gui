import { FC, useEffect, useState } from 'react';
import { EmsCardType } from '../../../zod-scheme/ems';
import { EmsEditButton } from '../EmsEditButton';
import { EmsSwitch } from '../EmsSwitch';

import { useUpdateEmsData } from './hooks';


interface EmsProps {
  card: EmsCardType;
  steelGradeId: number;
}

const checkBig = (key: string): boolean => {
  const keyArr = ['currentСoil', 'frequencyСoil', 'directionСoil'];
  return keyArr.includes(key);
};

export const EmsCard: FC<EmsProps> = ({ card, steelGradeId }) => {
  const [dataCard, setDataCard] = useState<EmsCardType>({
    steelCardId: 0,
    steelCardName: '',
    dimension: '',
    abr: '',
    date_edit: 1,
    unitArr: [],
  });
  const [edit, setEdit] = useState(false);
  const [dataChange, setDataChange] = useState(false);
  const handleSubmit = () => {
    setEdit(!edit)
    // Обработка нажатия на кнопку
  };
  const { updateEmsData } = useUpdateEmsData();


  useEffect(() => {
    if (!edit && dataChange && dataCard.unitArr.length > 0) {
      updateEmsData(dataCard, steelGradeId);
    }
  }, [edit, dataChange, dataCard, steelGradeId, updateEmsData])

  useEffect(() => setDataCard(JSON.parse(JSON.stringify(card))), [card]);

  const handleInputChange = (indexRow: number, key: string, value: number) => {
    const updatedDataCard: EmsCardType = { ...dataCard };
    updatedDataCard.unitArr![indexRow].units[key].value = value;
    setDataCard(updatedDataCard);
    setDataChange(true);
  };

  return (
    <div className="card-ems">
      <div className="card-ems__title-wrap">
        <h3 className="card-ems__title">{dataCard.steelCardName}</h3>
        <div className="card-ems__dimension">
          {dataCard.dimension}
          <EmsEditButton
            copyObg={null}
            edit={edit}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="card-ems__wrap">
        {dataCard.unitArr?.map((unitCard, indexRow) => (
          <div key={indexRow} className="card-ems__wrap-label">
            <div className="card-ems__sub-title">
              {unitCard.title}
            </div>

            {Object.entries(unitCard.units).map(([key, unit]) => (
              (!['runTime', 'reversTime', 'stopTime'].includes(key))
              || unitCard.units?.directionWork && unitCard.units?.directionWork.value === 2 && ['runTime', 'reversTime', 'stopTime'].includes(key)) &&
              <div
                key={key + '' + unitCard.idInverter}
                className={`card-ems__label ${checkBig(key) ? 'card-ems__label_big' : ''
                  } ${['directionWork', 'operatingMode'].includes(key) ? 'card-ems__label_switch' : ''} ${!edit ? 'card-ems__label_disabled' : ''}`}
              >
                <div className="card-ems__label-title">
                  {unit.title}
                  {' '}
                  {unit.unit && <span>({unit.unit})</span>}
                </div>
                {!['directionWork', 'operatingMode'].includes(key) ? (
                  <>
                    {edit && (
                      <input
                        type="number"
                        className="card-ems__label-input"
                        value={unit.value}
                        onChange={(e) => {
                          handleInputChange(indexRow, key, parseFloat(e.target.value));
                        }}
                        disabled={!edit}
                      />
                    )}
                    {!edit && (
                      <div className="card-ems__text">
                        {unit.value} {unit.unit}
                      </div>
                    )}
                  </>
                ) : (unit.valueText &&
                  <EmsSwitch
                    initialValue={unit.value}
                    valueText={unit.valueText}
                    onChange={(newValue) => {
                      handleInputChange(indexRow, key, newValue);
                    }}
                    disabled={!edit}
                  />
                )}

              </div>)}
          </div>
        ))}
      </div>
      <div className="card-ems__footer">
        <div className="card-ems__footer-text">{card.abr}</div>
        {dataCard.date_edit && (<div className="card-ems__footer-text">Обновлено: {new Date(dataCard.date_edit).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}</div>)}
      </div>
    </div>
  );
};