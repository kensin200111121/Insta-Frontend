import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React from 'react';
import { MyButton } from '@/components/basic';

const RemoveEnterprise: React.FC<DialogContentProps<string, string>> = ({ onClose, data }) => {

    return (
        <MyButton
            className='btn-active w-full'
            onClick={() => onClose(data)}
        >
            Yes
        </MyButton>
    )
}

export default withDialog(RemoveEnterprise);
