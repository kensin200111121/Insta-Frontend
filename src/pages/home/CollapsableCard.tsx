import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { MyButton } from '@/components/basic';
import './index.less';

interface CollapsableCardProps{
    children: React.ReactNode;
    title: string;
}

const CollapsableCard: React.FunctionComponent<CollapsableCardProps> = ({title, children}) => {
    const [isShow, setIsShow] = useState(false);
    const [isCollapsable, setIsCollapsable] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleResize = () => {
        if (cardRef.current) {
            setIsCollapsable(cardRef.current.scrollHeight > cardRef.current.clientHeight);
        }
    }

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [children]);

    return (
        <>
            <Card className={`collapse-content${isShow ? ' show' : ''}`} style={{paddingBottom: isCollapsable ? '30px' : '0px'}}>
                <div className='card-title'>{title}</div>
                <div className='collapse-card-body' ref={cardRef}>
                    {children}
                </div>
                {
                    isCollapsable && (
                        <MyButton className='btn-showmore' onClick={() => setIsShow(!isShow)}>
                            {isShow ? <>Hide <UpOutlined/></> : <>Show more <DownOutlined/></>}
                        </MyButton>
                    )
                }
            </Card>
        </>
    )
};

export default CollapsableCard;
