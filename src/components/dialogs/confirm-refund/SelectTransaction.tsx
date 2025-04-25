import type { TransactionItem } from '@/interface/data/transaction.interface';
import type { SerializedStyles } from '@emotion/react';
import { getPriceNumber } from '@/utils/getFormatedNumber';

import { css } from '@emotion/react';
import { AutoComplete } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface SelectTransactionProps {
  transactions: TransactionItem[];
  onSelect?: (transaction: TransactionItem) => void;
  className?: string;
  css?: SerializedStyles;
}

const SelectTransaction: React.FC<SelectTransactionProps> = ({ transactions, onSelect, className, css }) => {
  const [options, setOptions] = useState<TransactionItem[]>([]);
  const [searchKey, setSearchKey] = useState('');

  useEffect(() => {
    if (searchKey != '') {
      setOptions(
        transactions.filter(
          t =>
            t.transaction_id?.toUpperCase().indexOf(searchKey) >= 0 ||
            t.phone?.toUpperCase().indexOf(searchKey) >= 0 ||
            t.customer_name?.toUpperCase().indexOf(searchKey) >= 0,
        ),
      );
    } else {
      setOptions([]);
    }
  }, [transactions, searchKey]);

  const handleSelect = (value: string) => {
    onSelect && onSelect(transactions.find(t => t.transaction_id == value) as TransactionItem);
  };

  const handleSearch = (keyword: string) => {
    setSearchKey(keyword.toUpperCase());
  };

  const renderItem = (item: TransactionItem) => ({
    value: item.transaction_id,
    label: (
      <div css={styles}>
        <div className="transaction-item">
          <span>Transaction ID: </span>
          <span className="transaction-value">{item.transaction_id}</span>
        </div>
        <div className="transaction-item">
          <span>User Name: </span>
          <span className="transaction-value">{item.customer_name}</span>
        </div>
        <div className="transaction-item">
          <span>Phone: </span>
          <span className="transaction-value">{item.phone}</span>
        </div>
        <div className="transaction-item">
          <span>Amount: </span>
          <span className="transaction-value">{getPriceNumber(item.amount)}</span>
        </div>
        <div className="transaction-item">
          <span>Date: </span>
          <span className="transaction-value">{moment(item.created_at).format('MM/DD/YYYY')}</span>
        </div>
      </div>
    ),
  });

  return (
    <AutoComplete
      options={options.map(renderItem)}
      onSelect={handleSelect}
      onSearch={handleSearch}
      placeholder="Enter Transaction ID / Phone / Name"
      allowClear
      className={className}
      css={css}
    />
  );
};

export default SelectTransaction;

const styles = css`
margin: 5px 3px;
.transaction-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
.transaction-value{
    font-weight: 500;
}
`;
