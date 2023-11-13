import { Col, Form } from 'antd';
import React, { ReactNode } from 'react';

const FormItemComponent = ({
    grid,
    label,
    name,
    rules,
    valuePropName,
    inputField,
    style,
    extra,
    normalize,
    ...props
}: {
    validateStatus?: any;
    grid?: boolean;
    label: any;
    messageVariables?: any;
    name?: string;
    rules?: any;
    valuePropName?: any;
    inputField: ReactNode;
    extra?: any;
    style?: any;
    normalize?: any;
    props?: { dependencies: any };
}) => {
    return (
        <Col style={{}} span={grid ? 12 : 24}>
            <Form.Item
                // style={{ marginBottom: '14px' }}
                style={style}
                extra={extra}
                colon={false}
                label={label}
                name={name}
                rules={rules}
                valuePropName={valuePropName}
                normalize={normalize}
                {...props}
            >
                {inputField}
            </Form.Item>
        </Col>
    );
};

export default React.memo(FormItemComponent);
