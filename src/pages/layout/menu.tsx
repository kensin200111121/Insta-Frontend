import type { MenuList } from '../../interface/layout/menu.interface';
import type { FC } from 'react';

import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { setUserItem } from '@/stores/user.store';
import { CustomIcon } from './customIcon';

import LogoutFormDialog from '@/components/dialogs/log-out';
import { DialogMethod } from '@/types/props/dialog.type';
import { logoutAsync } from '@/stores/user.action';

interface MenuProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = props => {
  const { menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
  const { device, locale } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dialogRef = useRef<DialogMethod<any>>(null);

  const onOpen = () => {
    dialogRef.current?.open({});
  };

  const onClose = async (data?: any) => {
    if (data) {
      const res = dispatch(await logoutAsync());
    }
  };

  const onLogout = (data?: any) => {
    
  };

  const getTitle = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <CustomIcon type={menu.icon!} />
        <span>{menu.label[locale]}</span>
      </span>
    );
  };

  const onMenuClick = (path: string) => {
    if(path == '/log-out'){
      onOpen();
      return;
    }
    onChangeSelectedKey(path);
    navigate(path);

    if (device !== 'DESKTOP') {
      dispatch(setUserItem({ collapsed: true }));
    }
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

  return (
    <>
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={k => onMenuClick(k.key)}
      className="layout-page-sider-menu text-2"
      items={menuList.map(menu => {
        return menu.children
          ? {
              key: menu.code,
              label: getTitle(menu),
              children: menu.children.map(child => ({
                key: child.path,
                label: child.label[locale],
              })),
            }
          : {
              key: menu.path,
              label: getTitle(menu),
            };
      })}
    >
    </Menu>
    <LogoutFormDialog onClose={onClose} ref={dialogRef} title="Confirm" />
    </>
  );
};

export default MenuComponent;
