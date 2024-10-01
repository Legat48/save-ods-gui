import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../store/header';

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUniversal } from '../api/dataHub';
import { CircularProgress } from '@mui/material';

import { Heat, heat } from '../zod-scheme/heat';
import { z } from 'zod';
import { HeatNowContent } from '../components/HeatNowContent';


export function HeatNow() {
  const dispatch = useDispatch();
  const [timestamp, setTimestampInfo] = useState<number>(0);

  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Текущие актуальные плавки' }))
    dispatch(setTitle({ title: 'Плавки сейчас' }))
  }, []); // Пустой массив означает, что эффект вызывается только при монтировании

  const getHeatNow = async ({ queryKey }: { queryKey: any[] }) => {
    const [, params] = queryKey;
    const response = await getUniversal('GetHeatList', params);
    const newArr = new Set()
    if (response.result.data.length > 0) {
      const arr = [...response.result.data]
      const date = new Date(response.result.timestamp)
      const lastDate = `на ${date.toLocaleDateString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })}`
      for (let item of arr) {
        if (item.heatNo && `${item.heatNo}`.length > 4) {
          const responseHeat = await getUniversal('GetHeatData', [{ key: 'p_heat_no', value: item.heatNo }]);
          try {
            const result = heat.parse(responseHeat.result.data);
            newArr.add(result);

          } catch (err) {
            if (err instanceof z.ZodError) {
              for (const error of err.errors) {
                console.error(`Ошибка. Путь ${error.path} Сообщение: ${JSON.stringify(error)}`);
              }
            } else {
              console.error('Unexpected error:', err);
              // window.location.reload();
            }
          }
        }
      }

      dispatch(setHeaderTitle({ title: 'Текущие актуальные плавки,' + ' ' + lastDate + ' ' + newArr.size + ' плавок.'}));
      return [...newArr];
    }
  }

  const { isLoading, isError, data }: UseQueryResult<any> = useQuery({
    queryKey: ['GetHeatNow', [{ key: 'timestamp', value: 0 }]],
    queryFn: getHeatNow,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
    refetchInterval: 60000, // Обновлять данные каждую минуту
    refetchIntervalInBackground: true // даже если вкладка не активна
  });

  useEffect(() => {
    if (data) {

    }
  }, [data, dispatch]);



  return (
    <>
      {isLoading && <div className='app__preloaded'><CircularProgress></CircularProgress></div>}
      {isError && <p>Произошла ошибка загрузки</p>}
      {data && <div className="content__wrap content__wrap_hidden"><HeatNowContent data={data} /></div>}
    </>
  )
}

export const Component = HeatNow

