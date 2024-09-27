import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../../../store/header';

import { JsonWrapSmelting } from '../../../components/JsonWrapSmelting';


export function JsonInfoSmeltingPage() {
  const dispatch = useDispatch();

  // Установка заголовка страницы
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'JSON представления плавки' }));
    dispatch(setTitle({ title: 'JSON Плавки' }));
  }, [dispatch]);

  return (
    <div className="content__wrap" style={{ maxWidth: '1300px', margin: '0 auto' }}>
      <JsonWrapSmelting />
    </div>
  );
}

export const Component = JsonInfoSmeltingPage
