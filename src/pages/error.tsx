
import { useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../store/header';
import { useEffect } from 'react';
import { Box } from '@mui/material';

export function ErrorPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'ОДС | Ошибка' }))
    dispatch(setTitle({ title: 'ОДС | Ошибка' }))
  }, []); // Пустой массив означает, что эффект вызывается только при монтировании
  return (
    <div className="content__wrap">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '24px', fontWeight: 'bold' }}>
        <span>Ошибка при загрузке данных</span>
      </Box>
    </div>
  )
}

export const Component = ErrorPage
