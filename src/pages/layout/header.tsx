import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutAsync } from '../../stores/user.action';

import logo from '@/assets/icons/logo.png';
import { CustomIcon } from './customIcon';

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()));

        res && navigate('/login');

        return;
    }
  };


  return (
    <div className='header'>
      <img src={logo} />
      <span>INSTACREDITS</span>
      <a className='toggle-action' onClick={toggle}>
        <CustomIcon type={collapsed ? 'menu' : 'close'}></CustomIcon>
      </a>
    </div>
  );
};

export default HeaderComponent;
