import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React from 'react';
import { Row, Col, Input, Form } from 'antd';
import { MyButton } from '@/components/basic';
import { css } from '@emotion/react';

export type ConfirmChargebackStatusFormData = {
    _id: string,
    status: string
}

const ConfirmChargebackStatusForm: React.FC<DialogContentProps<ConfirmChargebackStatusFormData, ConfirmChargebackStatusFormData>> = ({ data, onClose }) => {

    return (
        <>
            <div css={styles}>Are you sure this Chargeback was {data.status.toUpperCase()}?</div>
            <Row gutter={15} style={{marginTop: '70px'}}>
                <Col span={12}>
                    <MyButton
                        className='btn-active w-full'
                        onClick={() => onClose(data)}
                    >
                        Yes
                    </MyButton>
                </Col>
                <Col span={12}><MyButton className='w-full' onClick={() => onClose()}>No</MyButton></Col>
            </Row>
        </>
    )
}

export default withDialog(ConfirmChargebackStatusForm);

const styles = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  font-family: Inter;
  color: #545F71;
  height: 76px;
`;