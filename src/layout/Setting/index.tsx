import LocalStorage from '@/apis/LocalStorage';
import sync from '@/assets/sync.json';
import IconAntd from '@/components/IconAntd';
import { DefaultSelectStyled } from '@/config/global.style';
import { SET_BG_APP, SET_BG_APP_COLOR, SET_BG_APP_FLOWER, SET_SYNC_LOADING } from '@/context/types';
import useCallContext from '@/hooks/useCallContext';
import { wait } from '@/utils';
import { Button, Checkbox, Col, Drawer, Popover, Row, Select, Switch } from 'antd';
import Lottie from 'lottie-react';
import React from 'react';
import { CirclePicker } from 'react-color';
import { useLocation, useNavigate } from 'react-router-dom';
import { syncService } from './service';

const Setting = () => {
    const { state, dispatch } = useCallContext();

    const { pathname } = useLocation();

    const [kiotVietId, setKiotVietId] = React.useState('');
    const navigate = useNavigate();

    const [openNoti, setOpenNoti] = React.useState(false);
    const audioRef: any = React.useRef();

    const handleSync = async (type: string) => {
        if (!kiotVietId) return;

        switch (type) {
            case 'category':
                navigate('/product/category');
                await syncService.sync(+kiotVietId, type);
                break;
            case 'product':
                navigate('/product');
                await syncService.sync(+kiotVietId, type);
                break;
            case 'user':
                navigate('/customer');
                await syncService.sync(+kiotVietId, type);
                break;
            case 'order':
                navigate('/order');
                await syncService.sync(+kiotVietId, type);
                break;
            case 'invoice':
                navigate('/order');
                await syncService.sync(+kiotVietId, type);
                break;
            default:
                break;
        }

        dispatch({ type: SET_SYNC_LOADING, payload: true });
        setOpenNoti(false);
        wait(5000).then(() => {
            dispatch({ type: SET_SYNC_LOADING, payload: false });
            // NotiMSG('success', 'Đồng bộ thành công');
        });
    };

    const content = (
        <Row style={{ flexDirection: 'column' }} gutter={[0, 12]}>
            <Col span={24}>
                <Button style={{ width: '100%' }} onClick={() => handleSync('category')}>
                    Đồng bộ danh mục
                </Button>
            </Col>
            <Col span={24}>
                <Button style={{ width: '100%' }} onClick={() => handleSync('product')}>
                    Đồng bộ sản phẩm
                </Button>
            </Col>
            <Col span={24}>
                <Button style={{ width: '100%' }} onClick={() => handleSync('order')}>
                    Đồng bộ đơn hàng
                </Button>
            </Col>
            <Col span={24}>
                <Button style={{ width: '100%' }} onClick={() => handleSync('user')}>
                    Đồng bộ khách hàng
                </Button>
            </Col>
            <Col span={24}>
                <Button style={{ width: '100%' }} onClick={() => handleSync('invoice')}>
                    Đồng bộ hóa đơn
                </Button>
            </Col>
        </Row>
    );

    return (
        <div>
            <Drawer closable={false} open={openNoti} onClose={() => setOpenNoti(false)}>
                <h4 className="gx-mb-4 gx-text-uppercase">
                    <strong>ĐỒNG BỘ</strong>
                </h4>
                <div>
                    <Lottie style={{ height: '200px' }} animationData={sync} />
                    <Row justify="center" className="gx-mx-0 gx-mt-4">
                        <Popover
                            placement="bottom"
                            content={content}
                            title={
                                <div style={{ padding: '10px 4px' }}>
                                    <DefaultSelectStyled
                                        allowClear
                                        onChange={(value: any) => setKiotVietId(value)}
                                        placeholder="Chọn chi nhánh"
                                    >
                                        {state?.kiotviets &&
                                            state?.kiotviets.map((item: any) => (
                                                <Select.Option key={item.id} value={item.id}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                    </DefaultSelectStyled>
                                </div>
                            }
                        >
                            <Button type="primary">Đồng bộ dữ liệu</Button>
                        </Popover>
                    </Row>
                </div>
                {/* <h4 className="gx-my-4 gx-text-uppercase">
                    <strong>CẤU HÌNH</strong>
                </h4>
                <div>
                    <div>Cấu hình</div>
                    <audio controls ref={audioRef} style={{ display: 'none' }}>
                        <source src={audiobell} type="audio/mp3" />
                    </audio>
                    <Button
                        onClick={() => {
                            audioRef.current.play();
                            notificationSync('Test thông báo socket');
                        }}
                    >
                        Test thông báo
                    </Button>
                </div> */}
                <h4 className="gx-my-4 gx-text-uppercase">
                    <strong>Giao diện</strong>
                </h4>
                <div>
                    <Row align="middle" className="gx-m-0">
                        <strong style={{ marginRight: '10px' }}>Chế độ tuyết</strong>
                        <Switch
                            defaultChecked={JSON.parse(LocalStorage.getBG() as any)}
                            onChange={(check: any) => {
                                dispatch({
                                    type: SET_BG_APP,
                                    payload: check,
                                });
                                LocalStorage.setBG(check);
                            }}
                        />
                    </Row>
                    <Row align="middle" className="gx-ml-4 gx-mt-2">
                        <Checkbox
                            onChange={(e) => {
                                dispatch({
                                    type: SET_BG_APP_FLOWER,
                                    payload: e.target.checked,
                                });
                            }}
                        >
                            Chế độ hoa đào
                        </Checkbox>
                    </Row>
                    <div style={{ margin: '10px 0 15px 0' }}>Màu tuyết rơi</div>
                    {state?.appBackground?.show && (
                        <Row className="gx-m-0" justify="center">
                            <CirclePicker
                                onChangeComplete={(value) =>
                                    dispatch({
                                        type: SET_BG_APP_COLOR,
                                        payload: value.hex,
                                    })
                                }
                            />
                        </Row>
                    )}
                </div>
            </Drawer>
            {pathname !== '/' && (
                <div className="gx-customizer-option">
                    <Button onClick={() => setOpenNoti(true)} type="primary">
                        <IconAntd spin icon="SettingOutlined" />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Setting;
