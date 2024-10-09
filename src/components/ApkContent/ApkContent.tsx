import { useEffect, useState } from 'react';
import { Heat } from '../../zod-scheme/heat';
import { MultipleSelect } from './MultipleSelect';
import { useQuery, UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from '@mui/material';
import { getDataHubSchema, createTable } from './function'
import { TableRow } from './interface'
import { headers } from '../../static/apk-heat-headers';
import { BaseTable } from '../BaseTable';



function generateClassTd(key: string, keyNumberArr: string[], value: number | string = ''): string {
  function selectClass(key: string, arr: string[], classItem: string): string {
    return arr.includes(key) ? classItem : '';
  }
  const classSet = new Set<string>();

  if (selectClass(key, keyNumberArr, 'table__item-content_number') === 'table__item-content_number') {
    classSet.add('table__item-content_number');
    if (typeof value === 'number' && value < 0) {
      classSet.add('table__item-content_alert');
    }
  }
  return [...classSet].join(' ');
}

function generateClassTr(unit: TableRow): string {
  const classArr: string[] = [];
  return classArr.join(' ');
}

export const ApkContent = () => {
  const [selectedFormats, setSelectedFormats] = useState(['УПК1', 'УПК2', 'УПК3']); // начальные значения

  const keyNumberArr: string[] = ['LDL_NO', 'LDL_IDLE_TIME', 'LDL_DUR'];
  const keyPercentArr: string[] = [];
  const keyDateArr: string[] = [];
  const editRow: boolean = false;


  const [tableArr, setTableArr] = useState<TableRow[]>([]);


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
    refetchInterval: 45000, // Обновлять данные каждую минуту
    refetchIntervalInBackground: true // даже если вкладка не активна
  });

  useEffect(() => {
    if (data) {
      setTableArr(createTable(data));
    }
  }, [data])


  return (
    <div className="stat-wrap">
      {isLoading && !data && <div className='app__preloaded'><CircularProgress></CircularProgress></div>}
      {isError && <p>Произошла ошибка</p>}
      {data && (
        <>
          <MultipleSelect formats={selectedFormats}
            onFormatsChange={handleFormatsChange}
            buttons={buttons} ></MultipleSelect>
          <BaseTable
            maxHeight={`90vh`}
            headers={headers}
            contentArr={tableArr}
            keyNumberArr={keyNumberArr}
            keyPercentArr={keyPercentArr}
            keyDateArr={keyDateArr}
            editRow={editRow}
            firstTdFunc={() => { }}
            classTdFunc={generateClassTd}
            classTrFunc={generateClassTr}
            rowFunc={() => { }}
            keyUpdateArr={[]}
            fixedColum={false}
            gridColum={'auto'}
          />
        </>
      )}
    </div>
  );
};