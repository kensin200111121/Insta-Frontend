import type { RefundCreateRequest } from '@/interface/data/refund.interface';
import { apiCreateRefund } from '@/api/pages/refund.api';
import { apiGetTransactions } from '@/api/pages/transaction.api';
import { createAsyncAction } from '@/stores/utils';
import { TransactionItem } from "@/interface/data/transaction.interface";
import { setTransactions, updateTransaction } from './reducer';
import getFormatedNumber, {parseCurrency, getPriceNumber } from '@/utils/getFormatedNumber';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const GetTransactionsAsync = createAsyncAction<Record<string, any>|undefined, boolean>((params) => {
  return async dispatch => {
    const { result, status } = await apiGetTransactions(params);

    if (status) {
      const transactionsWithNetAmount = result.data.map((transaction: TransactionItem) => ({
        ...transaction,
        net_amount: parseCurrency(getPriceNumber(transaction.amount)) - parseCurrency(getFormatedNumber(transaction.processing_fee)),
      }));
      dispatch(
        setTransactions({
          transactions: transactionsWithNetAmount,
          total: result.total
        }),
      );

      return true;
    }

    return false;
  };
});

export const CreateRefundAsync = createAsyncAction<RefundCreateRequest, boolean>(data => {
  return async dispatch => {
    const { status } = await apiCreateRefund(data);

    if (status) {
      dispatch(
        updateTransaction({
          id: data.transaction_id,
        }),
      );

      return true;
    }

    return false;
  };
});
