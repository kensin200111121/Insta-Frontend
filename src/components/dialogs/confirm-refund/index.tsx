import type { InputAmountFormData } from './InputAmount';
import type { DialogContentProps, DialogMethod } from '@/types/props/dialog.type';

import { css } from '@emotion/react';
import { Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import { MyButton } from '@/components/basic';
import withDialog from '@/patterns/hoc/withDialog';
import { getPriceNumber } from '@/utils/getFormatedNumber';

import InputAmountFormDialog from './InputAmount';

export type ConfirmRefundFormData = {
  refundAmount: number;
  transactionAmount: number;
  transaction_id: string;
};

const ConfirmRefundForm: React.FC<DialogContentProps<ConfirmRefundFormData, ConfirmRefundFormData>> = ({
  data,
  onClose,
}) => {
  const [partialAmount, setPartialAmount] = useState(data.transactionAmount);

  useEffect(() => {
    setPartialAmount(data.refundAmount);
  }, [data]);

  const inputDialogRef = useRef<DialogMethod<InputAmountFormData>>(null);

  const onInputOpen = () => {
    inputDialogRef.current?.open({ refundAmount: Number(data.transactionAmount.toFixed(2)) });
  };

  const onInputClose = (data?: InputAmountFormData) => {
    if (data) {
      setPartialAmount(data.refundAmount);
    }
  };

  return (
    <div css={styles}>
      <Row>
        <Col span={12}>
          <div className="highlight">Original Amount</div>
        </Col>
        <Col span={12}>{getPriceNumber(data.transactionAmount)}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className="highlight">Transaction ID</div>
        </Col>
        <Col span={12}>{data.transaction_id}</Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="text-center question">{`Issue Refund of ${getPriceNumber(partialAmount)}?`}</div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="text-center ">
            <a className="link" onClick={() => onInputOpen()}>
              Issue Partial Refund
            </a>
          </div>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={12}>
          <div className="link">Confirm Refund ?</div>
        </Col>
        <Col span={6}>
          <MyButton
            className="btn-active w-full"
            onClick={() => {
              onClose({...data, refundAmount: partialAmount});
            }}
          >
            Yes
          </MyButton>
        </Col>
        <Col span={6}>
          <MyButton className="w-full" onClick={() => onClose()}>
            No
          </MyButton>
        </Col>
      </Row>
      <InputAmountFormDialog
        className="title-center"
        onClose={onInputClose}
        ref={inputDialogRef}
        title="Enter Refund Amount"
      />
    </div>
  );
};

export default withDialog(ConfirmRefundForm);

const styles = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  font-family: Inter;
  .highlight {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    margin-left: 20px;
  }
  .question {
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;
    font-family: Poppins;
  }
  .ant-btn {
    border-radius: 15px;
  }
`;
