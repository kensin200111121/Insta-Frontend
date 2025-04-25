import React from 'react';
import { Row, Card, Col } from 'antd';

interface MyPageProps{
    header: React.ReactNode;
    children: React.ReactNode;
    title: string;
    headerActions: React.ReactNode;
    headerCollapsable?: boolean;
}

const MyPage: React.FC<MyPageProps> = ({title, header, children, headerActions, headerCollapsable}) => {

    return (
        <>
            <Row>
                <Col span={24}>
                    <Card className='header-content'>
                        <div className='page-header'>
                            {header}
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Card className='main-content'>
                        <div className={`card-header${headerCollapsable ? ' collapsable' : ''}`}>
                            <span className='card-title'>{title}</span>
                            <div className='card-actions'>{headerActions}</div>
                        </div>
                        {children}
                    </Card>
                </Col>
            </Row>
        </>
    )
};

export default MyPage;
