import { SET_MODAL_CHANGE_PASSWORD } from '@/context/types';
import { rules } from '@/features/App/home/rules';
import { authService } from '@/features/Auth/service';
import useCallContext from '@/hooks/useCallContext';
import { Notification } from '@/utils';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import React from 'react';
import SaveButton from '../Button/Save.Button';
import FormComponent from '../FormComponent';
import ModalComponent from '../ModalComponent';

interface IProps {
    openModal: any;
}

const ModalChangePassword = (props: IProps) => {
    const { openModal } = props;
    // const [open, setOpen] = React.useState<boolean>(openModal);
    const { state, dispatch } = useCallContext();
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const [form] = Form.useForm();
    // const { state } = useCallContext();
    const onClickClosePopup = () => {
        dispatch({ type: SET_MODAL_CHANGE_PASSWORD });
        form.resetFields();
    };

    const handleSubmit = async (value: { oldPassword: string; newPassword: string }) => {
        setLoading(true);
        authService
            .changePassword({
                current_password: value.oldPassword,
                new_password: value.newPassword,
            })
            .then((res: { status: any; data: { token: string } }) => {
                if (res.status) {
                    Notification('success', 'Đổi mật khẩu thành công');
                    dispatch({ type: SET_MODAL_CHANGE_PASSWORD });
                    form.resetFields();
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <ModalComponent modalVisible={openModal} title="Đổi mật khẩu" loading={isLoading}>
            <FormComponent form={form} onSubmit={handleSubmit}>
                <Row gutter={[20, 0]}>
                    <Col span={24}>
                        <Form.Item
                            rules={[rules.required('Vui lòng nhập mật khẩu cũ!'), rules.validatePassword]}
                            name="oldPassword"
                            label="Mật khẩu cũ"
                            hasFeedback
                        >
                            <Input.Password placeholder="Nhập mật khẩu cũ" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            rules={[rules.required('Vui lòng nhập mật khẩu mới!'), rules.validatePassword]}
                            name="newPassword"
                            label="Mật khẩu mới"
                            hasFeedback
                        >
                            <Input.Password placeholder="Nhập mật khẩu mới" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            rules={[
                                rules.required('Vui lòng xác nhận mật khẩu!'),
                                ({ getFieldValue }: any) => ({
                                    validator(_: any, value: any) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu nhập lại không trùng khớp!'));
                                    },
                                }),
                            ]}
                            dependencies={['newPassword']}
                            hasFeedback
                            name="reNewPassword"
                            label="Xác nhận mật khẩu"
                        >
                            <Input.Password placeholder="Nhập mật khẩu xác nhận" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={{ width: '100%' }} justify="end">
                    <Space>
                        <Button type="default" onClick={onClickClosePopup}>
                            Đóng
                        </Button>
                        <SaveButton htmlType="submit" />
                    </Space>
                </Row>
            </FormComponent>
        </ModalComponent>
    );
};

export default ModalChangePassword;
