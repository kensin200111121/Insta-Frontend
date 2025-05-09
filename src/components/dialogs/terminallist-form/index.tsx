import withDialog from '@/patterns/hoc/withDialog';
import { DialogContentProps } from '@/types/props/dialog.type';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TerminalItem } from '@/interface/data/terminal.interface';
import MyTable from '@/components/core/table';
import { apiGetTerminals } from '@/api/pages/terminal.api';
import moment from 'moment';

const TerminalListForm: React.FC<DialogContentProps<string, any>> = ({ data, onClose }) => {
    const dispatch = useDispatch();
    const [ terminals, setTerminals ] = useState<TerminalItem[]>([]);

    useEffect(() => {
        apiGetTerminals(data)
        .then(res => {
          if (res.status) {
            setTerminals(res.result);
          };
        })
        .finally(() => {});
    }, [data]);

    const columns = [
        {
            title: 'Date Added',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (val: Date) => moment(val).format('MM/DD/YYYY')
        },
        {
            title: 'Serial #',
            dataIndex: 'serial_number',
            key: 'serial_number',
            render: (val: string, record: TerminalItem) => (<div style={{minWidth: '80px'}}>{val}</div>)
        },
        {
            title: 'TPN',
            dataIndex: 'TPN',
            key: 'TPN',
            render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>)
        },
        {
            title: 'Model #',
            dataIndex: 'model_number',
            key: 'model_number',
            render: (val: string) => (<div style={{minWidth: '80px'}}>{val}</div>)
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (val: string) => (<div style={{minWidth: '100px'}}>{val}</div>)
        },
        {
            title: 'MID #',
            dataIndex: 'MID',
            key: 'MID',
            render: (val: string) => (<div style={{minWidth: '50px'}}>{val}</div>)
        }
    ];
    
    return (
        <MyTable dataSource={terminals} columns={columns} rowKey={record => record._id} pagable/>
    )
}

export default withDialog(TerminalListForm);
