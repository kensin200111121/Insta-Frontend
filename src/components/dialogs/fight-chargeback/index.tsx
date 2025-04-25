import type { DialogContentProps } from '@/types/props/dialog.type';
import type { UploadFile, UploadProps } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';

import { PlusCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Col, message, Row, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { apiUploadEvidence } from '@/api/pages/chargeback.api';
import { MyButton } from '@/components/basic';
import { updateChargebackWithEvidence } from '@/pages/chargebacks/store/reducer';
import withDialog from '@/patterns/hoc/withDialog';
import { getPriceNumber } from '@/utils/getFormatedNumber';

export type FightChargebackFormData = {
  id: string;
  file?: File;
  transaction_id: string;
  amount: number;
};

export type EvidenceResponse = { id: string; name: string; link: string };

const FightChargebackForm: React.FC<DialogContentProps<FightChargebackFormData, EvidenceResponse>> = ({
  data,
  onClose,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const dispatch = useDispatch();

  const beforeUpload = (file: { type: string; size: number }) => {
    const isValidFileType = file.type === 'application/pdf' || file.type.startsWith('image/');
    const isFileSizeValid = file.size / 1024 / 1024 < 5; // Limit to 5MB

    if (!isValidFileType) {
      message.error('You can only upload PDF or image files!');

      return false;
    }

    if (!isFileSizeValid) {
      message.error('File must be smaller than 5MB!');

      return false;
    }

    return true;
  };

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    fileList.forEach(file => {
      if (file.originFileObj) {
        formData.append('evidence', file.originFileObj);
      } else {
        console.error('File object is undefined:', file);
      }
    });
    formData.append('id', data.id);

    apiUploadEvidence(formData)
      .then(res => {
        if (res.status) {
          dispatch(
            updateChargebackWithEvidence({
              id: data.id,
              ...res.result,
            }),
          );
          onClose();
        }
      })
      .finally(() => {
        setFileList([]);
      });
  };

  return (
    <div css={styles}>
      <Row>
        <Col span={10}>
          <div className="highlight">Amount</div>
        </Col>
        <Col span={14}>{getPriceNumber(data.amount)}</Col>
      </Row>
      <Row>
        <Col span={10}>
          <div className="highlight">Transaction ID</div>
        </Col>
        <Col span={14}>{data.transaction_id}</Col>
      </Row>
      <Row>
        <Col span={24}>
          <Upload
            fileList={fileList}
            onChange={handleChange}
            className="w-full"
            maxCount={1}
            beforeUpload={beforeUpload}
          >
            <button className="w-full btn-upload" type="button">
              <span className="upload-icon">
                <PlusCircleOutlined />
              </span>
              <div>Upload Receipt</div>
            </button>
          </Upload>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <MyButton className="btn-active w-full" onClick={handleSubmit}>
            Confirm Upload
          </MyButton>
        </Col>
      </Row>
    </div>
  );
};

export default withDialog(FightChargebackForm);

const styles = css`
  color: black;
  .highlight {
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
  }
  .btn-active {
    height: 48px;
    border-radius: 30px;
  }
  .ant-upload {
    width: 100%;
    height: 138px;
    border-radius: 16px;
  }

  .btn-upload {
    width: 100%;
    height: 100%;
    border: 2px dotted #30260b;
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    font-family: Inter;
    font-weight: 400;
    font-size: 13px;
    line-height: 14px;
    color: #9ba5b7;
  }

  .upload-icon {
    font-size: 24px;
    color: #30260b;
  }
`;
