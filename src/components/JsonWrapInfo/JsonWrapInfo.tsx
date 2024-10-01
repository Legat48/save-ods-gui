import { useState, useEffect, SetStateAction, Key } from 'react';
import { BaseDropdown } from '../BaseDropdown';
import copyToClipboard from '../../utils/copyToClipboard';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUniversal } from '../../api/dataHub';
import { Button, CircularProgress, TextField } from '@mui/material';
import RenderInput from './RenderInput';


interface MetaData {
  description: string;
  methodName: string;
  methodType: string;
  id: string;
  jsonrpc: string;
  result: object,
  jsonSchema: any;
}

export const JsonWrapInfo = () => {
  const [metaData, setMetaData] = useState<MetaData[]>([]);
  const [methodName, setMethodName] = useState('GETMETADATA');
  const [fetchedData, setFetchedData] = useState<any>('')
  const [selectedItem, setSelectedItem] = useState<any>('')
  const [paramKey, setParamKey] = useState<any>(null)
  const [paramValue, setParamValue] = useState<any>()
  const [inputValue, setInputValue] = useState<any>({key: '', value: ''})
  const [dateValue, setDateValue] = useState<any>({key: "", value: ""})
  const [error, setError] = useState('');

  const getMethodData = async ({ queryKey }: { queryKey: any[] }) => {
    const [, [methodName, params]] = queryKey;
    const response = await getUniversal(methodName, params);
    return response;
  };
  const { isLoading, isError, data }: UseQueryResult<any> = useQuery({
    queryKey: ['GetMetaData', [methodName, [{ key: 'timestamp', value: 0 }, { key: paramKey, value: paramValue }]]],
    queryFn: getMethodData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });

  const getMetaData = async ({ queryKey }: { queryKey: any[] }) => {
    const [, params] = queryKey;
    const response = await getUniversal('GetMetaData', params);
    return response;
  };
  const { isLoading: loadingMeta, isError: errorMeta, data: initialData }: UseQueryResult<any> = useQuery({
    queryKey: ['GetMetaData', [{ key: 'timestamp', value: 0 }]],
    queryFn: getMetaData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });

  useEffect(() => {
    setError('');
    if (initialData) {
      try {
        const result = initialData.result.data;
        setMetaData(result);
        setSelectedItem(result.find((item: { methodName: string; }) => item.methodName === methodName).paramList)
      } catch (err) {
        setError('Ошибка обработки данных');
      }
    } else {
      setError('Ошибка получения данных');
    }
  }, [initialData, methodName]);

  useEffect(() => {
    setError('');
    if (data) {
      try {
        const result = data.result.data;
        setFetchedData(result);
      } catch (err) {
        setError('Ошибка обработки данных');
      }
    } else {
      setError('Ошибка получения данных');
    }
  }, [methodName, data]);
  const handleInputChange = ( paramName: any) => {
    setParamKey(paramName)
    setParamValue(inputValue.value);
    selectedItem
  }
  const handleInputChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue((prevState: any) => ({...prevState, value: newValue}));
  };
  const copyJson = () => {
    copyToClipboard(JSON.stringify(fetchedData));
  }
  const copyJsonScheme = () => {
    const item = metaData.find((item: { methodName: string; }) => item.methodName === methodName)
    if(item) {
      copyToClipboard(JSON.stringify(item.jsonSchema));
    } else {
      copyToClipboard('Ошибка')
    }
  }
  return (
    <div className="data-hub">
      <div className="data-hub__wrap-title">
        <h3 className="data-hub__title">Методы:</h3>
        {metaData && metaData.map((item, key) => (
          <div className='data-hub__card'>
            <Button
              onClick={() => {
                setMethodName(item.methodName)
                setParamValue('')
                setInputValue('')}}
              variant="outlined"
              size="large"
              disabled={item.methodType === 'PutExternalData'}
              sx={{
                color: item.methodName === methodName ? 'var(--color-ready) !important' : 'var(--color-btn-1)',
                backgroundColor: item.methodName === methodName ? 'var(--color-bg-white-1) !important' : '#fff',
                borderColor: item.methodName === methodName ? 'var(--color-ready) !important' : 'var(--color-btn-1)',
              }}
            >
              {item.methodName}
            </Button>
            <div className='data-hub__description'>{item.description}</div>

          </div>
        ))}
      </div>
      <div className="data-hub__wrap">
        <h3 className="data-hub__title">Состав схемы:</h3>
        {<div className='data-hub__wrap-inputs'><RenderInput selectedItem={selectedItem} inputValue={inputValue.value} handleInputChanges={handleInputChanges} handleInputChange={handleInputChange} /></div>}
        {isLoading && <div className='app__preloaded'><CircularProgress></CircularProgress></div>}
        {!isLoading && !error && fetchedData && (<div className="data-hub__scheme" style={{ maxWidth: '1300px', margin: '0 auto' }}>
          {Object.entries(fetchedData).map(([key, item]) => (
            <BaseDropdown
              key={key}
              methodName={methodName}
              json={item}
              keyTitle={key}
              title={key}
              drop={typeof item === 'object'}
              value={typeof item === 'object' ? '' : item}
            />
          ))}
        </div>)}
      {!isLoading && !error && fetchedData &&  (<div className='data-hub__wrap-btn'>
        <Button onClick={copyJson} variant="outlined" size="large">Копировать JSON в буфер</Button>
        <Button onClick={copyJsonScheme} variant="outlined" size="large">Копировать JSON схему в буфер</Button>
      </div>)}
      </div>
    </div>
  );
};