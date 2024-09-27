import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../store/header';
import { useGetStatus } from '../api/dataHub';
import { z } from 'zod';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { eqStatusScheme, eqStatusArr } from "../zod-scheme/eq-status";
import { setEqStatus } from '../store/eq-status';
import { AppState } from '../store';
import { EqContent } from '../components/EqStatus/EqContent';
import { CircularProgress } from '@mui/material';


export function EqStatusPage() {
  const dispatch = useDispatch();
  const [timestamp, setTimestampInfo] = useState<string>('0');

  const getData = async ({ queryKey }: { queryKey: string[] }) => {
    const [, timestamp] = queryKey;
    const response = await useGetStatus(timestamp);
    return response;
  };

  const { isLoading, isError, data, error }: UseQueryResult<any> = useQuery({
    queryKey: ['EQStatus', timestamp],
    queryFn: getData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
    refetchInterval: 30000, // Обновлять данные каждую минуту
    refetchIntervalInBackground: true // даже если вкладка не активна
  });
  const eqStatus = useSelector((state: AppState) => state.eqStatus.eqStatus);

  // Установка заголовка страницы
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Материалы ВПО' }));
    dispatch(setTitle({ title: 'ВПО | ОДС' }));
  }, [dispatch]);

  // Обработка данных после их получения
  useEffect(() => {
    if (data) {
      try {
        const result = eqStatusScheme.parse(data);
        dispatch(setEqStatus({ obj: result }));
        const date = new Date(result.result.timestamp)
        setTimestampInfo(String(result.result.timestamp))
        const lastDate = `Актуально на ${date.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}`
        dispatch(setHeaderTitle({ title: 'Материалы ВПО.' + ' ' + lastDate }));

      } catch (err) {
        if (err instanceof z.ZodError) {
          for (const error of err.errors) {
            console.error(`Ошибка валидации: Путь: ${error.path} Сообщение ${JSON.stringify(error)}`)
          }
        } else {
          console.error('Непредвиденная ошибка:', err);
        }
      }
    }
  }, [data, dispatch]);

  return (
    <>
      {isLoading && !eqStatus && <div className='app__preloaded'><CircularProgress></CircularProgress></div>}
      {isError && <p>Произошла ошибка: {error.message}</p>}
      {eqStatus && Array.isArray(eqStatus) && <div className="content__wrap"><EqContent eqStatus={eqStatus} /></div>}
    </>
  );
}

export const Component = EqStatusPage
