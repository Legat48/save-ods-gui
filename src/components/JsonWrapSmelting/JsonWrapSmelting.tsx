import { useState, useEffect } from 'react';
import { smeltingArrSchema } from '../../zod-scheme/smelting';
import { BaseDropdown } from '../BaseDropdown';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUniversal } from '../../api/dataHub';
import { z } from 'zod';
import { useSearchParams, useNavigate  } from'react-router-dom';

import { CircularProgress } from '@mui/material';

export const JsonWrapSmelting = () => {
  const [searchParams] = useSearchParams();
  const [heatNo, setHeatNo] = useState(searchParams.get('heat') || '64555'); // проверка строки
  const [smeltingData, setSmeltingData] = useState<any>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getSmeltingData = async ({ queryKey }: { queryKey: any[] }) => {
    const [, params] = queryKey;
    const response = await getUniversal('GetHeatData', params);
    return response;
  };

  const { isLoading, isError, data }: UseQueryResult<any> = useQuery({
    queryKey: ['GetSmelting', [{ key: 'p_heat_no', value: heatNo }]],
    queryFn: getSmeltingData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHeatNo = event.target.value
    setHeatNo(newHeatNo);
    navigate(`?heat=${newHeatNo}`);
  };

  // Обработка данных после их получения
  useEffect(() => {
    setSmeltingData([]);
    setError('');

    if (data) {
      try {
        const result = smeltingArrSchema.parse(data);
        setSmeltingData(result.result.data);
      } catch (err) {

        if (err instanceof z.ZodError) {
          for (const error of err.errors) {
            setError('Корректные данные не получены');
            console.error(`Ошибка валидации: Путь: ${error.path} Сообщение ${JSON.stringify(error)}`)
          }
        } else {
          setError('Ошибка получения данных');
          console.error('Непредвиденная ошибка:', err);
        }
      }
    } else {
      setError('Ошибка получения данных');
    }
  }, [data]);

  return (
    <div className="json-wrap">
      <div className="json-wrap__top-wrap">
        <div className="json-wrap__title">Представление плавки</div>
        <label className="json-wrap__search">
          <svg className="json-wrap__search-svg" xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
            <path
              d="M5.50006 0C8.53765 0 11.0001 2.46256 11.0001 5.50029C11.0001 6.74868 10.5842 7.89993 9.88346 8.82304L13.7791 12.7233C14.0718 13.0164 14.0715 13.4913 13.7785 13.784C13.4854 14.0767 13.0105 14.0764 12.7178 13.7834L8.82266 9.88388C7.89959 10.5847 6.74839 11.0006 5.50006 11.0006C2.46246 11.0006 0 8.53802 0 5.50029C0 2.46256 2.46246 0 5.50006 0ZM5.50006 1.5C3.2909 1.5 1.5 3.29098 1.5 5.50029C1.5 7.70961 3.2909 9.50058 5.50006 9.50058C7.70921 9.50058 9.50011 7.70961 9.50011 5.50029C9.50011 3.29098 7.70921 1.5 5.50006 1.5Z"
              fill="#818C99"
            />
          </svg>
          <input
            type="number"
            className="json-wrap__search-input btn"
            placeholder="Номер плавки"
            value={heatNo}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="json-wrap__wrap">
        {isLoading && <div className='app__preloaded'><CircularProgress></CircularProgress></div>}
        {!isLoading && !error && smeltingData && (
          <div className="content__wrap" style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <BaseDropdown json={smeltingData} methodName='GETHEATDATA' drop={true} title={`Плавка ${heatNo}`} />
          </div>
        )}
        {!isLoading && error && (
          <div>
            Плавка {heatNo} {error}
          </div>
        )}
      </div>
    </div >
  );
};