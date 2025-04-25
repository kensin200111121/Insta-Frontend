import { combineReducers } from '@reduxjs/toolkit';

import batchReducer from '@/pages/batches/store/reducer';
import chargebackReducer from '@/pages/chargebacks/store/reducer';
import fundingReportReducer from '@/pages/funding_report/store/reducer';
import homepageReducer from '@/pages/home/store/reducer';
import locationReducer from '@/pages/locations/store/reducer';
import merchantAccountReducer from '@/pages/merchant_accounts/store/reducer';
import agentReducer from '@/pages/agents/store/reducer';
import enterpriseReducer from '@/pages/enterprises/store/reducer';
import commissionReducer from '@/pages/commissions/store/reducer';
import refundReducer from '@/pages/refunds/store/reducer';
import settingReducer from '@/pages/settings/store/reducer';
import supportTicketReducer from '@/pages/support_tickets/store/reducer';
import terminalReducer from '@/pages/terminals/store/reducer';
import transactionReducer from '@/pages/transactions/store/reducer';

import globalReducer from './global.store';
import tagsViewReducer from './tags-view.store';
import userReducer from './user.store';

const rootReducer = combineReducers({
  user: userReducer,
  tagsView: tagsViewReducer,
  global: globalReducer,
  transaction: transactionReducer,
  batch: batchReducer,
  chargeback: chargebackReducer,
  refund: refundReducer,
  supportticket: supportTicketReducer,
  homepage: homepageReducer,
  setting: settingReducer,
  location: locationReducer,
  fundingreport: fundingReportReducer,
  terminal: terminalReducer,
  merchantaccount: merchantAccountReducer,
  agent: agentReducer,
  commission: commissionReducer,
  enterprise: enterpriseReducer,
});

export default rootReducer;
