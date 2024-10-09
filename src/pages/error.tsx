
import { useDispatch } from 'react-redux';
import { setHeaderTitle, setTitle } from '../store/header';
import { MenuList, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


import UsersSvg from '../assets/svg/users.svg?react';
import SettingsSvg from '../assets/svg/settings.svg?react';
import DateSvg from '../assets/svg/date.svg?react';
import ApkSvg from '../assets/svg/apk.svg?react';
import UdmSvg from '../assets/svg/udm.svg?react';
import zIndex from '@mui/material/styles/zIndex';


export function ErrorPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderTitle({ title: 'ОДС | Ошибка' }))
    dispatch(setTitle({ title: 'ОДС | Ошибка' }))
  }, []); // Пустой массив означает, что эффект вызывается только при монтировании
  return (
    <div className="content__wrap">
       <MenuList className='base-main__list'>
          <MenuItem className='base-main__link' component={RouterLink} to={`/`}>
            <DateSvg className='base-main__icon' />
            <span className='base-main__text'>Главная</span>
          </MenuItem>
          <MenuItem className='base-main__link' component={RouterLink} to={`/apk/`}>
            <ApkSvg className='base-main__icon' />
            <span className='base-main__text'>Агрегат печь-ковш</span>
          </MenuItem>
          <MenuItem className='base-main__link' component={RouterLink} to={`/eq-status/`}>
            <UdmSvg className='base-main__icon' />
            <span className='base-main__text'>Материалы ВПО</span>
          </MenuItem>
          <MenuItem className='base-main__link' component={RouterLink} to={`/ems-setting/`}>
            <SettingsSvg className='base-main__icon' />
            <span className='base-main__text'>ЭМП настройки</span>
          </MenuItem>
          <MenuItem className='base-main__link' component={RouterLink} to={`/json-info/smelting/`}>
            <DateSvg className='base-main__icon' />
            <span className='base-main__text'>JSON по плавке</span>
          </MenuItem>
          <MenuItem className='base-main__link' component={RouterLink} to={`/user-stat/`}>
            <UsersSvg className='base-main__icon' />
            <span className='base-main__text'>Статистика по пользователям</span>
          </MenuItem>
          <MenuItem className='base-main__link' component={RouterLink} to={`/json-info/`}>
            <DateSvg className='base-main__icon' />
            <span className='base-main__text'>Дата-хаб</span>
          </MenuItem>
          <MenuItem className='base-main__link' component={RouterLink} to={`/heat-now/`}>
            <DateSvg className='base-main__icon' />
            <span className='base-main__text'>Текущие плавки</span>
          </MenuItem>
          <MenuItem className='base-main__link' component={RouterLink} to={`/heat-report/`}>
            <DateSvg className='base-main__icon' />
            <span className='base-main__text'>Отчет по плавке</span>
          </MenuItem>
        </MenuList>
      <Box sx={{ position:'fixed', pointerEvents:'none', inset: '0', zIndex: '11', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '24px', fontWeight: 'bold' }}>
        <span>Ошибка при загрузке данных</span>
      </Box>
    </div>
  )
}

export const Component = ErrorPage
