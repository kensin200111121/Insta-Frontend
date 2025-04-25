import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { LoadingOutlined, FileImageOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

const UploadAvatar: FC = () => {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const uploadButton = (
        <button className='upload-picture'>
          <div className='upload-icon'>{loading ? <LoadingOutlined /> : <FileImageOutlined />}</div>
          <div>Upload Image</div>
        </button>
      );
    
    return (
        <>
            <Upload
                name="avatar"
                // listType="picture-circle"
                className="avatar-uploader text-center"
                showUploadList={false}
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>

        </>
    )
};

export default UploadAvatar;
