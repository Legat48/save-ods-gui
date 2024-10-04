import { useEffect, useState } from 'react';
import { Heat } from '../../zod-scheme/heat';
import { MultipleSelect } from './MultipleSelect';
import { useQuery, UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from '@mui/material';
import { getDataHubSchema } from './function'

export const ApkContent = () => {
  const [selectedFormats, setSelectedFormats] = useState(['УПК1', 'УПК2', 'УПК3']); // начальные значения

  const buttons = [
    { value: 'УПК1', label: 'АПК 1' },
    { value: 'УПК2', label: 'АПК 2' },
    { value: 'УПК3', label: 'АПК 3' },
    // Добавьте больше кнопок при необходимости
  ];
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ['GetApkData'] });
  }, [selectedFormats, queryClient]);

  const handleFormatsChange = (newFormats: (string[])) => {
    setSelectedFormats(newFormats);
  };


  const { isLoading, isError, data }: UseQueryResult<any> = useQuery({
    queryKey: ['GetApkData', [[{ key: 'timestamp', value: 0 }], selectedFormats]],
    queryFn: getDataHubSchema,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
    refetchInterval: 15000, // Обновлять данные каждую минуту
    refetchIntervalInBackground: true // даже если вкладка не активна
  });

  return (
    <div className="stat-wrap">
      {isLoading && !data && <div className='app__preloaded'><CircularProgress></CircularProgress></div>}
      {isError && <p>Произошла ошибка</p>}
      {data && (
        <>
          <MultipleSelect formats={selectedFormats}
            onFormatsChange={handleFormatsChange}
            buttons={buttons} ></MultipleSelect>
          {data && data.length > 0 && data.map((heat: Heat, index: number) => (
            <div key={index} style={{ margin: '0 0 10px 0' }}>
              {JSON.stringify(heat)}
            </div>
          ))}
        </>
      )}
    </div>
  );
};