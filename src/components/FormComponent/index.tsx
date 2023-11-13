import { Form, Row, Spin } from 'antd';
import { FormInstance, FormLayout } from 'antd/lib/form/Form';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

/* TODO
    layoutType: label và input theo dạng dọc hay ngang
    formItems: danh sách form item
    formItemLayout: custom layout responsive
    initialValues: giá trị mặc định cho form
    onSubmit: callback when click button htmlType = submit
    children: jsx node
    form: hook useForm ant form
    grid: grid col
*/

interface IFormItemLayout {
    labelCol: object;
    wrapperCol: object;
}

interface IPropsFormLayout {
    layoutType?: FormLayout;
    onSubmit: (data: any) => void;
    children?: ReactNode;
    formItemLayout?: IFormItemLayout;
    initialValues?: object;
    form?: FormInstance;
}

const FormComponent: React.FC<IPropsFormLayout> = ({
    layoutType = 'horizontal',
    formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } },
    initialValues,
    onSubmit,
    children,
    form,
}) => {
    const onFinish = (values: any) => {
        onSubmit(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <FormStyled
            {...(layoutType === 'vertical' ? null : formItemLayout)}
            labelAlign="left"
            name="basic"
            autoComplete="off"
            form={form}
            labelWrap
            layout={layoutType}
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError
        >
            {children}
        </FormStyled>
    );
};

const FormStyled = styled(Form)`
    height: 100%;

    & .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional):before {
        content: '';
        margin-right: 0;
    }

    & .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional):after {
        display: inline-block;
        margin-right: 4px;
        color: #ff4d4f;
        font-size: 14px;
        font-family: SimSun, sans-serif;
        line-height: 1;
        content: '*';
    }
`;

export default FormComponent;
