import LocalStorage from '@/apis/LocalStorage';
import { Notification, wait } from '@/utils';
import { errorValidPhone } from '@/utils/validation';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { authService } from '../../service';
import Wrapper from '../../Wrapper';
import InfoLogin from '../components/InfoLogin';

const LoginPage = () => {
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (value: { phoneNumber: string; password: string }) => {
        setLoading(true);

        authService.login(value).then((res: { status: any; data: { token: string } }) => {
            if (res.status) {
                LocalStorage.setToken(res?.data?.token);
                Notification('success', 'Đăng nhập thành công');
                wait(1500).then(() => {
                    window.location.reload();
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });
    };

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div className="gx-app-login-wrap">
                <div className="gx-app-login-container">
                    <Wrapper loading={loading}>
                        <div className="gx-app-login-main-content">
                            <InfoLogin />
                            <div className="gx-app-login-content">
                                <Form
                                    // initialValues={{ email: 'admin@gmail.com', password: 'admin' }}
                                    onFinish={handleSubmit}
                                    className="gx-signin-form gx-form-row"
                                >
                                    <Form.Item name="phoneNumber" rules={[errorValidPhone]}>
                                        <Input placeholder="Nhập tài khoản" />
                                    </Form.Item>
                                    <Form.Item
                                        className="gx-mb-1"
                                        name="password"
                                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                    >
                                        <Input.Password type="password" placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    {/* <Row justify="end">
                                        <Form.Item className="gx-m-0" initialValue={true}>
                                            <Checkbox checked>Nhớ mật khẩu</Checkbox>
                                        </Form.Item>
                                    </Row> */}
                                    <Form.Item className="gx-mt-4 gx-d-flex gx-justify-content-end">
                                        <Button type="primary" htmlType="submit" className="gx-mb-0">
                                            Đăng nhập
                                        </Button>
                                        {/* <span>hoặc </span>
                                        <Link to={routerPage.register}>Đăng ký</Link> */}
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Wrapper>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
