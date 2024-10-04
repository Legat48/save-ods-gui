import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle, setShowHeader } from '../store/header';


import { ApkContent } from '../components/ApkContent';



export function ApkPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'Агрегат печь-ковш' }))
    dispatch(setTitle({ title: 'АПК | ОДС' }))
    dispatch(setShowHeader({ value: false}))

  }, []); // Пустой массив означает, что эффект вызывается только при монтировании
  return (
    <div className="content__wrap">
      <ApkContent></ApkContent>
    </div>
  )
}

export const Component = ApkPage

