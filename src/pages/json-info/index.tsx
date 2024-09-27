import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../../store/header';
import { JsonWrapInfo } from '../../components/JsonWrapInfo';

export function JsonInfoPage() {
  const dispatch = useDispatch();

  // Установка заголовка страницы
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'JSON информация' }));
    dispatch(setTitle({ title: 'JSON информация по Data Hub' }));
  }, [dispatch]);


  return (
    <div className="content__wrap" style={{ width: '100%', margin: '0 auto' }}>
      <JsonWrapInfo />
    </div>
  );
}

export const Component = JsonInfoPage
