import type { FC } from 'react';

import { ReactComponent as AccountSvg } from '@/assets/menu/account.svg';
import { ReactComponent as DashboardSvg } from '@/assets/menu/dashboard.svg';
import { ReactComponent as DocumentationSvg } from '@/assets/menu/documentation.svg';
import { ReactComponent as GuideSvg } from '@/assets/menu/guide.svg';
import { ReactComponent as PermissionSvg } from '@/assets/menu/permission.svg';
import { ReactComponent as HomeSvg } from '@/assets/icons/home.svg';
import { ReactComponent as TransactionSvg } from '@/assets/icons/transaction.svg';
import { ReactComponent as ChargebackSvg } from '@/assets/icons/chargeback.svg';
import { ReactComponent as RefundSvg } from '@/assets/icons/refund.svg';
import { ReactComponent as BatchSvg } from '@/assets/icons/batch.svg';
import { ReactComponent as TicketSvg } from '@/assets/icons/ticket.svg';
import { ReactComponent as SettingSvg } from '@/assets/icons/setting.svg';
import { ReactComponent as LogoutSvg } from '@/assets/icons/logout.svg';
import { ReactComponent as CloseSvg } from '@/assets/icons/close.svg';
import { ReactComponent as MenuSvg } from '@/assets/icons/menu.svg';
import { ReactComponent as FundingreportSvg } from '@/assets/icons/fundingreport.svg';
import { ReactComponent as TerminalSvg } from '@/assets/icons/terminal.svg';
import { ReactComponent as MerchantaccountSvg } from '@/assets/icons/merchantaccount.svg';

interface CustomIconProps {
  type: string;
}

export const CustomIcon: FC<CustomIconProps> = props => {
  const { type } = props;
  let com = <GuideSvg />;

  if (type === 'guide') {
    com = <GuideSvg />;
  } else if (type === 'permission') {
    com = <PermissionSvg />;
  } else if (type === 'dashboard') {
    com = <DashboardSvg />;
  } else if (type === 'account') {
    com = <AccountSvg />;
  } else if (type === 'documentation') {
    com = <DocumentationSvg />;
  } else if (type === 'home') {
    com = <HomeSvg />
  } else if (type === 'transaction') {
    com = <TransactionSvg />
  } else if (type === 'batch') {
    com = <BatchSvg />
  } else if (type === 'refund') {
    com = <RefundSvg />
  } else if (type === 'chargeback') {
    com = <ChargebackSvg />
  } else if (type === 'ticket') {
    com = <TicketSvg />
  } else if (type === 'setting') {
    com = <SettingSvg />
  } else if (type === 'logout') {
    com = <LogoutSvg />
  } else if (type === 'close') {
    com = <CloseSvg />
  } else if (type === 'menu') {
    com = <MenuSvg />
  } else if (type === 'fundingreport') {
    com = <FundingreportSvg />
  } else if (type === 'terminal') {
    com = <TerminalSvg />
  } else if (type === 'merchantaccount') {
    com = <MerchantaccountSvg />
  }

  return <span className="anticon">{com}</span>;
};
