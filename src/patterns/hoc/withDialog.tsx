import React, { useImperativeHandle, useRef, useState } from 'react';
import { Button, Modal } from "antd"
import { DialogContentProps } from '@/types/props/dialog.type';
import { SerializedStyles } from '@emotion/react';

export type DialogMethod<T> = {
    open: (_: T) => void
}

type DialogProps<U> = {
    title: string,
    className?: string,
    css?:SerializedStyles,
    onClose: (_?: U) => void,
    shouldCheckConfirmation?: boolean
}

function withDialog<T extends {}, U extends {}>(ContentComponent: React.FC<DialogContentProps<T, U>>) {
    const DialogWithContent = React.forwardRef<DialogMethod<T>, DialogProps<U>>(
        ({ onClose, title, className, css, shouldCheckConfirmation }, ref) => {
            const [isOpened, setIsOpened] = useState(false);
            const [data, setData] = useState<T>();

            const [isConfirmOpened, setIsConfirmOpend] = useState(false);
            const tempData = useRef<U>();
    
            useImperativeHandle(ref, () => {
                return {
                  open: (_data: T) => {
                    console.log('opened the dialog action');
                    setData(_data);
                    setIsOpened(true);
                  },
                };
            }, []);
    
            const close = (data?: U) => {
                setIsOpened(false);
                onClose(data);
            }

            const closeByHeader = () => {
                if (shouldCheckConfirmation) {
                    setIsConfirmOpend(true);
                    return;
                } else {
                    setIsOpened(false);
                }
            }

            const handleConfirmModalCancel = () => {
                setIsConfirmOpend(false);
            };

            const handleConfirmModalOk = () => {
                setIsConfirmOpend(false);
                setIsOpened(false);
            }

            return (
                <>
                <Modal
                    title={title}
                    className={className}
                    css={css}
                    open={isOpened}
                    onCancel={closeByHeader}
                    onOk={() => setIsOpened(false)}
                    footer={null}
                >
                    {
                        data && <ContentComponent data={data} onClose={close}></ContentComponent>
                    }
                </Modal>
                <Modal
                    title="Confirmation"
                    visible={isConfirmOpened}
                    onOk={handleConfirmModalOk}
                    onCancel={handleConfirmModalCancel}
                    footer={[
                    <Button key="no" onClick={handleConfirmModalCancel}>
                        No
                    </Button>,
                    <Button key="yes" type="primary" className="btn-active" onClick={handleConfirmModalOk}>
                        Yes
                    </Button>,
                    ]}
                >
                    <p>Any changes will not be saved, are you sure you want to exit?</p>
                </Modal>
                </>
                
            )
        }
    )

    return DialogWithContent;
}

export default withDialog;