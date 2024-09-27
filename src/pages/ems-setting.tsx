import { useEffect, useState } from 'react';
import { EmsContent } from '../components/EmsContent';
import {  useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../store/header';
import EmsApi from '../api/ems';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { emsArrSchema } from "../zod-scheme/ems";
import { setEmsDataStore } from '../store/ems';
import { z } from 'zod';

import { CircularProgress } from '@mui/material';

export function EmsPage() {
  const [emsData, setEmsData] = useState<any>([]);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const getEmsData = async ({ queryKey }: { queryKey: string[] }) => {
    const [, lang] = queryKey;
    const response = await EmsApi.getArr(lang);
    return response;
  };

  const { isLoading, isError, data }: UseQueryResult<any> = useQuery({
    queryKey: ['GetEms', ''], // Replace 'ru' with the desired language
    queryFn: getEmsData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0
  });

  // Set page title
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Настройки для ЭМП' }));
    dispatch(setTitle({ title: 'ЭМП | ОДС' }));
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      try {
        const result = emsArrSchema.parse(data);
        const localEmsDataString = localStorage.getItem('emsData');
        if (localEmsDataString) {
          const localEmsData = JSON.parse(localEmsDataString);

          const parseLocalResult = emsArrSchema.parse(localEmsData);
          const localVersion = parseLocalResult.v ;
          if (localVersion === result?.v) {

            setEmsData(parseLocalResult.result.data);
            dispatch(setEmsDataStore(parseLocalResult.result.data));
          } else {

            setEmsData(result.result.data);
            dispatch(setEmsDataStore(result.result.data));
            localStorage.setItem('emsData', JSON.stringify(result));
          }

        } else {

          setEmsData(result.result.data);
          dispatch(setEmsDataStore(result.result.data));
          localStorage.setItem('emsData', JSON.stringify(result));
        }

      } catch (err) {
        if (err instanceof z.ZodError) {
          setError('Ошибка валидации данных');
          for (const error of err.errors) {
            console.error(`Validation error: Path: ${error.path} Message: ${JSON.stringify(error)}`);
          }
        } else {
          setError('Произошла непредвиденная ошибка');
          console.error('Unexpected error:', err);
          window.location.reload();
        }
      }
    }
  }, [data, dispatch]);

  return (
      <>
        {isLoading && <div className='app__preloaded'><CircularProgress></CircularProgress></div>}
        {isError && <div>Произошла ошибка: {error}</div>}
        {emsData && (
            <EmsContent emsData={emsData.typeSteelArr}></EmsContent>
        )}
      </>
  );
}

export const Component = EmsPage
