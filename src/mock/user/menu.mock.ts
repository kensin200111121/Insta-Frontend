import type { MenuList } from '@/interface/layout/menu.interface';

import { intercepter, mock } from '../config';
import { Role } from '@/interface/user/login';

const mockMenuList: MenuList = [
  {
    code: 'home',
    label: {
      zh_CN: '首页',
      en_US: 'Home',
    },
    icon: 'home',
    path: '/home',
    role: [0, 1, 2]
  },
  {
    code: 'transactions',
    label: {
      zh_CN: '文档',
      en_US: 'Transactions',
    },
    icon: 'transaction',
    path: '/transactions',
    role: [0, 1, 2]
  },
  {
    code: 'batches',
    label: {
      zh_CN: '文档',
      en_US: 'Batches',
    },
    icon: 'batch',
    path: '/batches',
    role: [0, 1, 2]
  },
  {
    code: 'chargebacks',
    label: {
      zh_CN: '文档',
      en_US: 'Chargebacks',
    },
    icon: 'chargeback',
    path: '/chargebacks',
    role: [0, 1, 2]
  },
  {
    code: 'refunds',
    label: {
      zh_CN: '文档',
      en_US: 'Refunds',
    },
    icon: 'refund',
    path: '/refunds',
    role: [0, 1, 2]
  },
  {
    code: 'support_tickets',
    label: {
      zh_CN: '文档',
      en_US: 'Support Tickets',
    },
    icon: 'ticket',
    path: '/support_tickets',
    role: [0]
  },
  {
    code: 'locations',
    label: {
      zh_CN: 'Locations',
      en_US: 'Locations',
    },
    icon: 'ticket',
    path: '/locations',
    role: [2]
  },
  {
    code: 'funding_report',
    label: {
      zh_CN: 'Funding Report',
      en_US: 'Funding Report',
    },
    icon: 'fundingreport',
    path: '/funding_report',
    role: [2]
  },
  {
    code: 'terminals',
    label: {
      zh_CN: 'Terminals',
      en_US: 'Terminals',
    },
    icon: 'terminal',
    path: '/terminals',
    role: [2]
  },
  {
    code: 'merchant_accounts',
    label: {
      zh_CN: 'Merchant Accounts',
      en_US: 'Merchant Accounts',
    },
    icon: 'merchantaccount',
    path: '/merchant_accounts',
    role: [2]
  },
  {
    code: 'agents',
    label: {
      zh_CN: 'Agents',
      en_US: 'Agents',
    },
    icon: 'merchantaccount',
    path: '/agents',
    role: [0, 1, 2]
  },
  {
    code: 'enterprises',
    label: {
      zh_CN: 'Enterprises',
      en_US: 'Enterprises',
    },
    icon: 'merchantaccount',
    path: '/enterprises',
    role: [0, 1, 2]
  },
  {
    code: 'settings',
    label: {
      zh_CN: '文档',
      en_US: 'Settings',
    },
    icon: 'setting',
    path: '/settings',
    role: [0, 1, 2]
  },
  {
    code: 'logout',
    label: {
      zh_CN: '引导',
      en_US: 'Log Out',
    },
    icon: 'logout',
    path: '/log-out',
    role: [0, 1, 2]
  }
];


mock.mock('/user/menu', 'post', (config: any) => {
  const role : Role = config.body;

  return intercepter(mockMenuList.filter(menu => menu.role.indexOf(role) >= 0));
});
