import { useEffect, useState } from 'react';
import { EmsContent } from '../components/EmsContent';
import { useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../store/header';
import EmsApi from '../api/ems';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { emsArrSchema, EmsAttributeSchemaType } from "../zod-scheme/ems";
import { setEmsDataStore, setEmsAttributesStore } from '../store/ems';
import { z } from 'zod';

import { CircularProgress } from '@mui/material';

export const EmsPage = () => {
  const [emsData, setEmsData] = useState<any>([]);
  const [attributeArr, setAttributeArr] = useState<EmsAttributeSchemaType[]>([]);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const getEmsData = async ({ queryKey }: { queryKey: string[] }) => {
    // const [, lang] = queryKey;
    const response = await EmsApi.getArr();
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
        setAttributeArr(result.result.data.attributes);
        setEmsData(result.result.data.steel_types);
        dispatch(setEmsDataStore(result.result.data.steel_types));
        dispatch(setEmsAttributesStore(result.result.data.attributes));

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
        <EmsContent emsData={emsData}></EmsContent>
      )}
    </>
  );
}

export const Component = EmsPage
