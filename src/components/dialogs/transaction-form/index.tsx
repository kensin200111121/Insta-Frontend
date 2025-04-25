import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps, DialogMethod } from '@/types/props/dialog.type';
import type { RefundCreateRequest } from '@/interface/data/refund.interface';
import React, { useEffect, useRef } from 'react';
import { Row, Form, Col } from 'antd';
import { MyButton } from '@/components/basic';
import type { TransactionItem } from '@/interface/data/transaction.interface';
import { getPriceNumber } from '@/utils/getFormatedNumber';
import ConfirmRefundFormDialog from '@/components/dialogs/confirm-refund';
import { CreateRefundAsync } from '@/pages/transactions/store/action';
import type { ConfirmRefundFormData } from '@/components/dialogs/confirm-refund';
import { AppStore } from '@/stores';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const TransactionForm: React.FC<DialogContentProps<TransactionItem, TransactionItem>> = ({ data, onClose }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const confirmDialogRef = useRef<DialogMethod<ConfirmRefundFormData>>(null);
    const inputDialogRef = useRef<DialogMethod<TransactionItem[]>>(null);

    useEffect(() => {
        form.resetFields();
    }, [data]);

    const onConfirmOpen = () => {
        confirmDialogRef.current?.open({
            refundAmount: data.amount,
            transactionAmount: data.amount,
            transaction_id: data.transaction_id
        });
    };

    const onConfirmClose = (refundConfirmData?: ConfirmRefundFormData) => {
    if (refundConfirmData) {
        const refundData: RefundCreateRequest = {
            transaction_id: data._id,
            amount: refundConfirmData.refundAmount,
        };

        dispatch(CreateRefundAsync(refundData));
        }
    }
    return (
        <>
            <Form<TransactionItem>
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                className='setting-form'
            >
                <Row>
                    <Col span={12}>
                    <div className="highlight">Transaction ID</div>
                    </Col>
                    <Col span={12}>{data.transaction_id}</Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div className="highlight">Amount</div>
                    </Col>
                    <Col span={12}>{getPriceNumber(data.amount)}</Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div className="highlight">Card Brank</div>
                    </Col>
                    <Col span={12}>{`${data.card_brand}`}</Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div className="highlight">card_number</div>
                    </Col>
                    <Col span={12}>{`${data.card_number}`}</Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div className="highlight">Card Type</div>
                    </Col>
                    <Col span={12}>{`${data.card_type}`}</Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div className="highlight">Convenience Fee</div>
                    </Col>
                    <Col span={12}>{getPriceNumber(data.convenience_fee)}</Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div className="highlight">Customer Name</div>
                    </Col>
                    <Col span={12}>{`${data.customer_name}`}</Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div className="highlight">Net Amount</div>
                    </Col>
                    <Col span={12}>{getPriceNumber(data.net_amount)}</Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div className="highlight">Processing Fee</div>
                    </Col>
                    <Col span={12}>{getPriceNumber(data.processing_fee)}</Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <div className="highlight">Response Code</div>
                    </Col>
                    <Col span={12}>{`${data.response_code}`}</Col>
                </Row>
                <Row>
                    { data.response_code && <MyButton
                        className='btn-active w-full' htmlType='submit'
                        onClick={onConfirmOpen}
                    >
                        Refund
                    </MyButton>
                    }
                </Row>
            </Form>
            <ConfirmRefundFormDialog
                className="title-center"
                onClose={onConfirmClose}
                ref={confirmDialogRef}
                title="Refund Confirmation"
            />
        </>
    )
}

export default withDialog(TransactionForm);
