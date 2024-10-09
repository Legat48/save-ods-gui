import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg?react'

type TProps = {
}

import { useSelector } from 'react-redux';
import { AppState } from '../../store';

export const Header = () => {
  const headerTitle = useSelector((state: AppState) => state.header.headerTitle);

  return (
    <div className="header">
      <div className="header__wrap">
        <Link className='header__logo' to={`/`}>
          <Logo className='header__logo-icon'></Logo>
          {headerTitle}
        </Link>
        <div className="header__version">
          v.1.2.7
        </div>
      </div>
    </div>
  )
}
