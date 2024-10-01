import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../store/header';

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getUniversal } from '../api/dataHub';
import { CircularProgress } from '@mui/material';
import { HeatReportContent } from '../components/HeatReportContent';



export function ApkPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Отчет по плавке' }))
    dispatch(setTitle({ title: 'Отчет плавки | ОДС' }))
  }, []); // Пустой массив означает, что эффект вызывается только при монтировании

  interface Process {
    unit: string;
    proc_begin: string;
    proc_end: string;
    operation: any[];
  }

  const getDataHubShema = async ({ queryKey }: { queryKey: any[] }) => {
    const [, params] = queryKey;
    const response1 = await getUniversal('GetHeatList', params);
    const response2 = await getUniversal('GetLastChgHeatList', params);
    const newArr = new Set()
    if (response1.result.data.length > 0 && response2.result.data.length > 0) {
      const arr = [...response1.result.data, response2.result.data]

      for (let item of arr) {
        if (item.heatNo && `${item.heatNo}`.length > 4) {
          try {
            const response = await getUniversal('GetHeatData', [{ key: 'p_heat_no', value: item.heatNo }]);
            if (response.result.data.processes && response.result.data.processes.length > 0) {
              response.result.data.processes.forEach((j: Process) => {
                if (['УПК1', 'УПК2', 'УПК2'].includes(j.unit)) {
                  newArr.add(response.result.data);
                }
              })
            }
          } catch (e) {
            console.error(`Ошибка получения информации по плавке ${item.heatNo}`)
          }
        }
      }
      return [...newArr];
    }
    return [response1, response2];
  }

  const { isLoading, isError, data }: UseQueryResult<any> = useQuery({
    queryKey: ['GetApkData', [{ key: 'timestamp', value: 0 }]],
    queryFn: getDataHubShema,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });
  return (
    <div className="content__wrap">
      {isLoading && !data && <div className='app__preloaded'><CircularProgress></CircularProgress></div>}
      {isError && <p>Произошла ошибка</p>}
      {data && (<HeatReportContent data={data}></HeatReportContent>)}
    </div>
  )
}

export const Component = ApkPage

