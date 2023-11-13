import { routerPage } from '@/config/contants.routes';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import Wrapper from '../Wrapper';
import InfoRegister from './components/InfoRegister';

const RegisterPage = () => {
    const handleSubmit = async (value: any) => {
        console.log('🚀 ~ file: index.tsx ~ line 7 ~ handleSubmit ~ value', value);
    };
    return (
        <div className="gx-app-login-wrap">
            <div className="gx-app-login-container">
                <Wrapper loading={true}>
                    <div className="gx-app-login-main-content">
                        <InfoRegister />
                        <div className="gx-app-login-content">
                            <Form onFinish={handleSubmit} className="gx-signup-form gx-form-row0">
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'string',
                                            message: 'Vui lòng nhập họ tên',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập họ và tên" />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            type: 'email',
                                            message: 'Vui lòng nhập đúng địa chỉ E-mail!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Nhập địa chỉ email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                >
                                    <Input.Password type="password" placeholder="Nhập mật khẩu" />
                                </Form.Item>
                                <Form.Item initialValue={true}>
                                    <Checkbox checked>Bằng cách đăng ký, tôi chấp nhận</Checkbox>
                                    <span className="gx-signup-form-forgot gx-link">Kì hạn và điều kiện</span>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="gx-mb-0">
                                        Đăng ký
                                    </Button>
                                    <span>hoặc </span>
                                    <Link to={routerPage.login}>Đăng nhập</Link>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Wrapper>
            </div>
        </div>
    );
};

export default RegisterPage;
