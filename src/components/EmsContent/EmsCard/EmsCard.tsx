import { FC, useEffect, useState } from 'react';
import { EmsCardType, EmsAttributeSchemaType } from '../../../zod-scheme/ems';
import { EmsEditButton } from '../EmsEditButton';
import { EmsSwitch } from '../EmsSwitch';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';

import { useUpdateEmsData } from './hooks';

import settingEms from '../../../static/ems-setting';


interface EmsProps {
  card: EmsCardType;
  steelGradeId: number;
}

const checkBig = (key: number): boolean => {
  const keyArr = settingEms.idAlternateValue;
  return keyArr.includes(key);
};

export const EmsCard: FC<EmsProps> = ({ card, steelGradeId }) => {
  const [dataCard, setDataCard] = useState<EmsCardType>({
    card_id: 0,
    card_name: '',
    dimension_id: 0,
    dimension_name: '',
    chg_dt: 1,
    invertors: [],
  });
  const [edit, setEdit] = useState(false);
  const [dataChange, setDataChange] = useState(false);
  const attributeMap = useSelector((state: AppState) => state.ems.emsAttributeAsObj);
  const handleSubmit = () => {
    setEdit(!edit)
    // Обработка нажатия на кнопку
  };
  const { updateEmsData } = useUpdateEmsData();


  useEffect(() => {
    if (!edit && dataChange && dataCard.invertors.length > 0) {
      updateEmsData(dataCard, steelGradeId);
    }
  }, [edit, dataChange, dataCard, steelGradeId, updateEmsData])

  useEffect(() => setDataCard(JSON.parse(JSON.stringify(card))), [card]);

  const handleInputChange = (indexRow: number, indexAttrs: number, value: number) => {
    const updatedDataCard: EmsCardType = { ...dataCard };
    updatedDataCard.invertors![indexRow].invertor_attrs[indexAttrs].attr_value_num = value;
    // updatedDataCard.invertors![indexRow].invertor_attrs.[key].value = value;
    setDataCard(updatedDataCard);
    setDataChange(true);
  };

  return (
    <div className="card-ems">
      <div className="card-ems__title-wrap">
        <h3 className="card-ems__title">{dataCard.card_name}</h3>
        <div className="card-ems__dimension_name">
          {/* {dataCard.dimension_name} */}
          <EmsEditButton
            copyObg={null}
            edit={edit}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div className="card-ems__wrap">
        {dataCard.invertors?.map((unitCard, indexRow) => (
          <div key={indexRow} className="card-ems__wrap-label">
            <div className="card-ems__sub-title">
              {unitCard.invertor_name}
            </div>
            {/* Цикл для отрисовки подкарточек */}
            {
              unitCard.invertor_attrs.map((unit, indexAttrs) =>
                !settingEms.idAlternateValue.includes(unit.attr_id) ?
                  <div
                    key={unit.attr_id}
                    className={`card-ems__label ${checkBig(unit.attr_id) ? 'card-ems__label_big' : ''
                      } ${settingEms.idSwitch.includes(unit.attr_id) ? 'card-ems__label_switch' : ''} ${!edit ? 'card-ems__label_disabled' : ''}`}
                  >
                    {/* Титул карточки */}
                    <div className="card-ems__label-title">
                      {attributeMap[unit.attr_id]?.attr_name}
                      {' '}
                      {attributeMap[unit.attr_id]?.attr_unit_abbr && <span>({attributeMap[unit.attr_id].attr_unit_abbr})</span>}
                    </div>
                    {
                      !(settingEms.idSwitch.includes(unit.attr_id) && unit.hasOwnProperty('attr_value_dic') && unit.attr_value_dic && attributeMap[unit.attr_id]?.hasOwnProperty('attribute_values') && attributeMap[unit.attr_id]?.attribute_values) && (edit && (
                        <input
                          type="number"
                          className="card-ems__label-input"
                          value={unit.attr_value_num}
                          onChange={(e) => {
                            handleInputChange(indexRow, indexAttrs, parseFloat(e.target.value));
                          }}
                          disabled={!edit}
                        />
                      ) || (
                          !edit && (
                            <div className="card-ems__text">
                              {unit.attr_value_num} {attributeMap[unit.attr_id]?.attr_unit_abbr}
                            </div>
                          )
                        ))
                    }
                    {
                      settingEms.idSwitch.includes(unit.attr_id) && unit.hasOwnProperty('attr_value_dic') && unit.attr_value_dic && attributeMap[unit.attr_id]?.hasOwnProperty('attribute_values') && attributeMap[unit.attr_id]?.attribute_values &&
                      <EmsSwitch
                        initialValue={unit.attr_value_dic}
                        attributeValues={attributeMap[unit.attr_id].attribute_values || []}
                        onChange={(newValue) => {
                          handleInputChange(indexRow, indexAttrs, newValue);
                        }}
                        disabled={!edit}
                      />
                    }

                  </div> :
                  <div
                    key={unit.attr_id}
                    className={`card-ems__label ${checkBig(unit.attr_id) ? 'card-ems__label_big' : ''
                      } ${settingEms.idSwitch.includes(unit.attr_id) ? 'card-ems__label_switch' : ''} ${!edit ? 'card-ems__label_disabled' : ''}`}
                  >
                    <div className="card-ems__label-title">
                      {attributeMap[unit.attr_id]?.attr_name}
                      {' '}
                      {attributeMap[unit.attr_id]?.attr_unit_abbr && <span>({attributeMap[unit.attr_id].attr_unit_abbr})</span>}
                    </div>
                    {edit && (
                      <input
                        type="number"
                        className="card-ems__label-input"
                        value={unit.attr_value_num}
                        onChange={(e) => {
                          handleInputChange(indexRow, unit.attr_id, parseFloat(e.target.value));
                        }}
                        disabled={!edit}
                      />
                    )}
                    {!edit && (
                      <div className="card-ems__text">
                        {unit.attr_value_num} {attributeMap[unit.attr_id]?.attr_unit_abbr}
                      </div>
                    )}

                  </div>
              )}
          </div>
        ))}


        {/* {
            unitCard.invertor_attrs.map(unit) => (
              (![5, 6, 8].includes(unit.attr_id))
              || unitCard.invertor_attrs.find(e => e.attr_id === 3) && unitCard.invertor_attrs.find(e => e.attr_id === 3).hasOwnProperty('attr_value_dic') unitCard.invertor_attrs.find(e => e.attr_id === 3).attr_value_dic === 3 && [5, 6, 8].includes(unit.attr_id)) &&
              <div
                key={unit.attr_id}
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

              </div>)} */}
      </div>
      <div className="card-ems__footer">
        <div className="card-ems__footer-text">
          {/* {card.abr} */}
        </div>
        {dataCard.chg_dt && (<div className="card-ems__footer-text">Обновлено: {new Date(dataCard.chg_dt).toLocaleDateString('ru-RU', {
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