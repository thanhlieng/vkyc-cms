import { TitleCard } from '@/config/global.style';
import { Col, Row } from 'antd';
import React, { ReactNode } from 'react';

const CardContainer = ({
    title,
    leftCol,
    rightCol,
    oneRow,
}: {
    title: string;
    leftCol: ReactNode;
    rightCol: ReactNode;
    oneRow?: ReactNode;
}) => {
    return (
        <>
            <TitleCard>{title}</TitleCard>
            <Row className="gx-mx-2">
                <Col xs={24} sm={24} md={12}>
                    {leftCol}
                </Col>
                <Col xs={24} sm={24} md={12}>
                    {rightCol}
                </Col>
                <Col span={24}>{oneRow}</Col>
            </Row>
        </>
    );
};

export default React.memo(CardContainer);
