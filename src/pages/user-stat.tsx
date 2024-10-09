import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../store/header';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { UserStatContent } from '../components/UserStatContent';
import { getUniversal } from '../api/dataHub';
import { CircularProgress } from '@mui/material';




export default function UserStatPage() {
  const dispatch = useDispatch();
  const [isCurrentStats, setIsCurrentStats] = useState(true)
  // Установка заголовка страницы
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Статистика по пользователям' }));
    dispatch(setTitle({ title: 'Статистика по пользователям' }));
  }, [dispatch]);

  // Получение данных, функция для запроса
  const getData = async ({ queryKey }: { queryKey: any[] }) => {
    const [, params] = queryKey; // params приходит пустым
    const statType = isCurrentStats ? 'GETCURRENTSTAT' : 'GETPREVIOUSSTAT'
    // const responseInfo = await getUniversal('GETPREVIOUSSTAT', params); //за вчера
    const responseInfo = await getUniversal(statType, params);
    const responseUser = await getUniversal('GETUSERLIST', params);
    return [responseInfo, responseUser, isCurrentStats];
  };
  // настройки вызова с сервера (API)
  const { isLoading, isError, data }: UseQueryResult<any> = useQuery({
    queryKey: [isCurrentStats ? 'GETCURRENTSTAT' : 'GETPREVIOUSSTAT', []],
    queryFn: getData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
    refetchInterval: 60000, // Обновлять данные каждую минуту
    refetchIntervalInBackground: true // даже если вкладка не активна
  });


  return (
    <>
        {isLoading && <div className='app__preloaded'><CircularProgress></CircularProgress></div>}
        {isError && <p>Произошла ошибка загрузки</p>}
        {data && <div className="content__wrap content__wrap_hidden"><UserStatContent data={data} setIsCurrentStats={setIsCurrentStats} isCurrentStats={isCurrentStats}/></div>}
    </>
  )
}

export const Component = UserStatPage
