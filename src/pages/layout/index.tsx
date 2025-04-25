import type { MenuChild, MenuList } from '@/interface/layout/menu.interface';
import type { FC } from 'react';

import './index.less';

import { Layout } from 'antd';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { getMenuList } from '@/api/layout.api';
import { setUserItem } from '@/stores/user.store';
import { getFirstPathCode } from '@/utils/getFirstPathCode';

import { useGuide } from '../guide/useGuide';
import MenuComponent from './menu';

import HeaderComponent from './header';

const { Sider, Content } = Layout;

const LayoutPage: FC = () => {
  const location = useLocation();
  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const [menuList, setMenuList] = useState<MenuList>([]);
  const { device, collapsed, newUser, role } = useSelector(state => state.user);

  const dispatch = useDispatch();
  const { driverStart } = useGuide();

  useEffect(() => {
    const code = getFirstPathCode(location.pathname);

    setOpenkey(code);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const toggle = () => {
    dispatch(
      setUserItem({
        collapsed: !collapsed,
      }),
    );
  };

  const changeSelectedKey = (k: string) => {
    setSelectedKey(k);
    dispatch(
      setUserItem({
        collapsed: true,
      }),
    );
  }

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];

    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu);
        });
      }
    });

    return MenuListAll;
  };

  const fetchMenuList = useCallback(async () => {
    const { status, result } = await getMenuList();

    if (status) {
      setMenuList(result);
      dispatch(
        setUserItem({
          menuList: initMenuListAll(result),
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  useEffect(() => {
    newUser && driverStart();
  }, [newUser]);

  return (
    <Layout className="layout-page">
      <Layout>
      <Sider
          className={"layout-page-sider mb-0" + (collapsed ? ' collapsed' : '')}
          trigger={null}
        >
          <HeaderComponent collapsed={collapsed} toggle={toggle}></HeaderComponent>
          <MenuComponent
            menuList={menuList}
            openKey={openKey}
            onChangeOpenKey={k => setOpenkey(k)}
            selectedKey={selectedKey}
            onChangeSelectedKey={changeSelectedKey}
          />
        </Sider>
        <Content className="layout-page-content">
          {/* <TagsView /> */}
          <div id="pageTabs" />
          <Suspense fallback={null}>
            <div>
              <Outlet />
            </div>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
