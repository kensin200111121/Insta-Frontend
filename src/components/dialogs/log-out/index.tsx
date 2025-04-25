import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React from 'react';
import { Row, Col, Input, Form } from 'antd';
import { MyButton } from '@/components/basic';
import { css } from '@emotion/react';

const LogoutForm: React.FC<DialogContentProps<any, any>> = ({ onClose }) => {

    return (
        <>
            <div css={styles}>Are you sure you want to logout?</div>
            <Row gutter={15} style={{marginTop: '70px'}}>
                <Col span={12}>
                    <MyButton
                        className='btn-active w-full'
                        onClick={() => onClose(true)}
                    >
                        Yes
                    </MyButton>
                </Col>
                <Col span={12}><MyButton className='w-full' onClick={() => onClose()}>No</MyButton></Col>
            </Row>
        </>
    )
}

export default withDialog(LogoutForm);

const styles = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  font-family: Inter;
  color: #545F71;
  height: 76px;
`;