import { Role } from "../user/login";

interface MenuItem {
  /** menu item code */
  code: string;
  /** menu labels */
  label: {
    zh_CN: string;
    en_US: string;
  };
  /** 图标名称
   *
   * 子子菜单不需要图标
   */
  icon?: string;
  /** 菜单路由 */
  path: string;
  /** 子菜单 */
  children?: MenuItem[];
  role: Role[];
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];
