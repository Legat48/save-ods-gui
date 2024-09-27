import { useDispatch } from 'react-redux';
import { emsArrSchema, EmsDataType } from '../../../zod-scheme/ems';
import { setEmsDataStore } from '../../../store/ems';
import { EmsCardType } from '../../../zod-scheme/ems';

export const useUpdateEmsData = () => {
  const dispatch = useDispatch();

  const updateEmsData = (dataCard: EmsCardType, steelGradeId: number) => {
    updateEmsDataInLocalStorage(dataCard, steelGradeId);

    // Получаем обновленные данные из localStorage
    const localEmsDataString = localStorage.getItem('emsData');
    if (localEmsDataString) {
      const localEmsData = JSON.parse(localEmsDataString) as EmsDataType;
      const parseLocalResult = emsArrSchema.parse(localEmsData);
      dispatch(setEmsDataStore(parseLocalResult.result.data));
    }
  };

  return { updateEmsData };
};

const updateEmsDataInLocalStorage = (dataCard: EmsCardType, steelGradeId: number) => {
  const localEmsDataString = localStorage.getItem('emsData');
  if (localEmsDataString) {
    const localEmsData = JSON.parse(localEmsDataString) as EmsDataType;
    const parseLocalResult = emsArrSchema.parse(localEmsData);
    const steelGradeIndex = parseLocalResult.result.data.typeSteelArr.findIndex((item) => item.typeSteelId === steelGradeId);
    if (steelGradeIndex !== -1) {
      const cardIndex = parseLocalResult.result.data.typeSteelArr[steelGradeIndex].settingArr.findIndex((e) => e.steelCardId === dataCard.steelCardId);
      if (cardIndex !== -1) {
        parseLocalResult.result.data.typeSteelArr[steelGradeIndex].settingArr[cardIndex] = dataCard;
        localStorage.setItem('emsData', JSON.stringify(parseLocalResult));
      }
    }
  }
};