import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import Dashboard from '@/pages/dashboard';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';

import WrapperRouteComponent from './config';
import HomePage from '@/pages/home';
import TransactionPage from '@/pages/transactions';
import BatchPage from '@/pages/batches';
import ChargebackPage from '@/pages/chargebacks';
import RefundPage from '@/pages/refunds';
import SupportTicketPage from '@/pages/support_tickets';
import SettingPage from '@/pages/settings';
import LocationPage from '@/pages/locations';
import FundingReportPage from '@/pages/funding_report';
import TerminalPage from '@/pages/terminals';
import MerchantAccountPage from '@/pages/merchant_accounts';
import AgentPage from '@/pages/agents';
import EnterprisePage from '@/pages/enterprises';
import CommissionPage from '@/pages/commissions';
import ReportPage from '@/pages/reports';
import NotProcessedReportPage from '@/pages/not_processed_reports';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const Documentation = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/doucumentation'));
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/guide'));
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '@/pages/permission/route'));
const FormPage = lazy(() => import(/* webpackChunkName: "form'"*/ '@/pages/components/form'));
const TablePage = lazy(() => import(/* webpackChunkName: "table'"*/ '@/pages/components/table'));
const SearchPage = lazy(() => import(/* webpackChunkName: "search'"*/ '@/pages/components/search'));
const TabsPage = lazy(() => import(/* webpackChunkName: "tabs'"*/ '@/pages/components/tabs'));
const AsidePage = lazy(() => import(/* webpackChunkName: "aside'"*/ '@/pages/components/aside'));
const RadioCardsPage = lazy(() => import(/* webpackChunkName: "radio-cards'"*/ '@/pages/components/radio-cards'));
const BusinessBasicPage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/business/basic'));
const BusinessWithSearchPage = lazy(() => import(/* webpackChunkName: "with-search" */ '@/pages/business/with-search'));
const BusinessWithAsidePage = lazy(() => import(/* webpackChunkName: "with-aside" */ '@/pages/business/with-aside'));
const BusinessWithRadioCardsPage = lazy(
  () => import(/* webpackChunkName: "with-aside" */ '@/pages/business/with-radio-cards'),
);
const BusinessWithTabsPage = lazy(() => import(/* webpackChunkName: "with-tabs" */ '@/pages/business/with-tabs'));

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />,
  },
  {
    path: '/login/:type',
    element: <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" auth />,
    children: [
      {
        path: '',
        element: <Navigate to="home" />,
      },
      {
        path: 'home',
        element: <WrapperRouteComponent element={<HomePage />} titleId="title.home" />,
      },
      {
        path: 'transactions',
        element: <WrapperRouteComponent element={<TransactionPage />} titleId="title.transaction" />,
      },
      {
        path: 'batches',
        element: <WrapperRouteComponent element={<BatchPage />} titleId="title.batch" />,
      },
      {
        path: 'chargebacks',
        element: <WrapperRouteComponent element={<ChargebackPage />} titleId="title.chargeback" />,
      },
      {
        path: 'refunds',
        element: <WrapperRouteComponent element={<RefundPage />} titleId="title.refund" />,
      },
      {
        path: 'reports',
        element: <WrapperRouteComponent element={<ReportPage />} titleId="title.report" />,
      },
      {
        path: 'support_tickets',
        element: <WrapperRouteComponent element={<SupportTicketPage />} titleId="title.support_ticket" />,
      },
      {
        path: 'locations',
        element: <WrapperRouteComponent element={<LocationPage />} titleId="title.location" />,
      },
      {
        path: 'not_processed_reports',
        element: <WrapperRouteComponent element={<NotProcessedReportPage />} titleId="title.not_processed_report" />,
      },
      {
        path: 'funding_reports',
        element: <WrapperRouteComponent element={<FundingReportPage />} titleId="title.funding_report" />,
      },
      {
        path: 'terminals',
        element: <WrapperRouteComponent element={<TerminalPage />} titleId="title.terminal" />,
      },
      {
        path: 'merchants',
        element: <WrapperRouteComponent element={<MerchantAccountPage />} titleId="title.merchant_account" />,
      },
      {
        path: 'agents',
        element: <WrapperRouteComponent element={<AgentPage />} titleId="title.agent" />,
      },
      {
        path: 'enterprises',
        element: <WrapperRouteComponent element={<EnterprisePage />} titleId="title.agent" />,
      },
      {
        path: 'commissions',
        element: <WrapperRouteComponent element={<CommissionPage />} titleId="title.commission" />,
      },
      {
        path: 'settings',
        element: <WrapperRouteComponent element={<SettingPage />} titleId="title.setting" />,
      },
      {
        path: 'dashboard',
        element: <WrapperRouteComponent element={<Dashboard />} titleId="title.dashboard" />,
      },
      {
        path: 'documentation',
        element: <WrapperRouteComponent element={<Documentation />} titleId="title.documentation" />,
      },
      {
        path: 'guide',
        element: <WrapperRouteComponent element={<Guide />} titleId="title.guide" />,
      },
      {
        path: 'permission/route',
        element: <WrapperRouteComponent element={<RoutePermission />} titleId="title.permission.route" auth />,
      },
      {
        path: 'component/form',
        element: <WrapperRouteComponent element={<FormPage />} titleId="title.account" />,
      },
      {
        path: 'component/table',
        element: <WrapperRouteComponent element={<TablePage />} titleId="title.account" />,
      },
      {
        path: 'component/search',
        element: <WrapperRouteComponent element={<SearchPage />} titleId="title.account" />,
      },
      {
        path: 'component/tabs',
        element: <WrapperRouteComponent element={<TabsPage />} titleId="title.account" />,
      },
      {
        path: 'component/aside',
        element: <WrapperRouteComponent element={<AsidePage />} titleId="title.account" />,
      },
      {
        path: 'component/radio-cards',
        element: <WrapperRouteComponent element={<RadioCardsPage />} titleId="title.account" />,
      },
      {
        path: 'business/basic',
        element: <WrapperRouteComponent element={<BusinessBasicPage />} titleId="title.account" />,
      },
      {
        path: 'business/with-search',
        element: <WrapperRouteComponent element={<BusinessWithSearchPage />} titleId="title.account" />,
      },
      {
        path: 'business/with-aside',
        element: <WrapperRouteComponent element={<BusinessWithAsidePage />} titleId="title.account" />,
      },
      {
        path: 'business/with-radio-cards',
        element: <WrapperRouteComponent element={<BusinessWithRadioCardsPage />} titleId="title.account" />,
      },
      {
        path: 'business/with-tabs',
        element: <WrapperRouteComponent element={<BusinessWithTabsPage />} titleId="title.account" />,
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
      },
    ],
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
