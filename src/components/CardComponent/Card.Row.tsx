import { Col, Row } from 'antd';
import React from 'react';

const CardRow = ({
    left,
    right,
    rightStyle,
    leftStyle,
    full,
}: {
    left: any;
    right: any;
    rightStyle?: any;
    leftStyle?: any;
    full?: boolean;
}) => {
    return full ? (
        <Row className="gx-mt-4">
            <Col span={5} style={{ ...leftStyle }}>
                {left}
            </Col>
            <Col span={19} style={{ ...rightStyle, fontWeight: 700 }}>
                {right}
            </Col>
        </Row>
    ) : (
        <Row className="gx-mt-4">
            <Col span={10} style={{ ...leftStyle }}>
                {left}
            </Col>
            <Col span={14} style={{ ...rightStyle, fontWeight: 700 }}>
                {right}
            </Col>
        </Row>
    );
};

export default CardRow;
