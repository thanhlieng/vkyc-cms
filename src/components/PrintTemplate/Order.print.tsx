import { currencyFormat, momentToStringDate, readMoney } from '@/utils';
import { Col, Row, Table } from 'antd';
import moment from 'moment';
import React from 'react';
import TableComponent from '../TableComponent';
import './style/order.style.css';

const RowInfo: React.FC<{ left: any; right: any }> = React.memo(({ left, right }) => {
    return (
        <div className="gx-mx-5 gx-mt-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="s6 left">{left}</div>
            <div className="s6 right">{right}</div>
        </div>
    );
});

const OrderPrint = React.forwardRef((props?: any, ref?: any) => {
    const { detailOrder } = props;
    // const total =
    //     detailOrder?.isOrderSynced == 1 ? detailOrder?.total : detailOrder?.total - detailOrder?.totalDiscount;
    const total_voucher = detailOrder?.totalDiscount - detailOrder?.usePoint;

    let total_amount =
        detailOrder?.isOrderSynced == 1 ? detailOrder?.total + detailOrder?.totalDiscount : detailOrder?.total;

    return (
        <div className="order_print" ref={ref}>
            <Row className="s1" justify="space-between">
                <div>{moment().format('DD/MM/YYYY, HH:mm')}</div>
                <div>Giao dịch - Hóa đơn</div>
            </Row>
            <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
            </p>
            <h2 className="title_info">CÔNG TY CỔ PHẦN STAKA (Khánh Anh)</h2>
            <h2 className="title_info">Địa chỉ: - Đường Phú Định - Phường 16 - Quận 8 - Thành phố Hồ Chí Minh</h2>
            <h2 className="title_info">SĐT: 0867 484 186 - 0789 0187 89</h2>
            <h2 className="title_info">CTK: Đinh Quốc Ngọ</h2>
            <h2 className="title_info">220226868-(MB Bank),CN.Hồng Lĩnh-Hà Tĩnh</h2>
            <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
            </p>
            <h1 className="title_info">HÓA ĐƠN BÁN HÀNG</h1>
            <h4 className="title_info">Số: {detailOrder?.code}</h4>
            <Row className="gx-mx-5">
                <Col span={14}>
                    <p className="s2">
                        Tên khách hàng: <span className="gx-font-weight-bold">{detailOrder?.user?.fullName}</span>
                    </p>
                </Col>
                <Col span={10}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        <span className="s3">SĐT: {detailOrder?.user?.phoneNumber}</span>
                    </p>
                </Col>
                <Col span={14}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        Địa chỉ: {detailOrder?.user?.address}
                    </p>
                </Col>
                <Col span={10}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        Ngày lập hóa đơn: {momentToStringDate(detailOrder?.createdAt)}
                    </p>
                </Col>
                <Col span={14}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        Khu vực: {detailOrder?.kiotviet?.defaultBranchName}
                    </p>
                </Col>
                <Col span={10}>
                    <p className="s2" style={{ paddingTop: '1pt', textIndent: '0pt' }}>
                        NVBH: ------!-----
                    </p>
                </Col>
            </Row>

            <p style={{ textIndent: '0pt' }}>
                <br />
            </p>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Table
                    dataSource={detailOrder ? detailOrder?.items : []}
                    pagination={false}
                    bordered
                    columns={[
                        {
                            title: 'STT',
                            dataIndex: 'id',
                            align: 'center',
                            render: (row, record, index) => index + 1,
                        },
                        {
                            title: 'Tên sản phẩm',
                            dataIndex: 'productName',
                        },
                        {
                            title: 'Đơn vị tính',
                            dataIndex: 'productUnit',
                            align: 'center',
                        },
                        {
                            title: 'Số lượng',
                            dataIndex: 'quantity',
                            align: 'center',
                        },
                        {
                            title: 'Giá bán',
                            dataIndex: 'price',
                            align: 'center',
                            render: (value) => currencyFormat(value),
                        },
                        {
                            title: 'Thành tiền',
                            dataIndex: '',
                            align: 'center',
                            render: (value, row: any) => currencyFormat(row?.price * row?.quantity),
                        },
                    ]}
                />
                <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                    <br />
                </p>

                <div style={{ width: '100%' }}>
                    <RowInfo left="Tổng tiền:" right={currencyFormat(total_amount)} />
                    <RowInfo left="Tổng tiền giảm(Điểm tích lũy):" right={currencyFormat(detailOrder?.usePoint)} />
                    {!detailOrder?.giftStatus && (
                        <RowInfo left="Tổng tiền giảm(Voucher):" right={currencyFormat(total_voucher)} />
                    )}
                    <RowInfo left="Khách hàng cần thanh toán:" right={currencyFormat(detailOrder?.total)} />
                    <RowInfo left="Khách hàng đã thanh toán:" right={currencyFormat(detailOrder?.totalPayment)} />
                    {detailOrder?.giftStatus && detailOrder?.voucher?.name ? (
                        <RowInfo left="Quà tặng:" right={detailOrder?.voucher?.name} />
                    ) : null}
                </div>

                <div>
                    <p
                        className="s8"
                        style={{ paddingTop: '10pt', padding: '0 18pt', textIndent: '0pt', textAlign: 'left' }}
                    >
                        Bằng chữ: <i>{readMoney(total_amount?.toString())}</i>
                    </p>
                    <p style={{ paddingTop: '8pt', padding: '0 18pt', textIndent: '0pt', textAlign: 'left' }}>
                        Lưu ý: Khách hàng nhận hàng, kiểm hàng, có gì thắc măc thì phản hồi lại cho công ty Khánh Anh
                        trong vòng 03 ngày kể từ ngày nhận hàng.
                    </p>
                    <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                        <br />
                    </p>
                    <p style={{ padding: '0 18pt', textIndent: '0pt', textAlign: 'left' }}>
                        Thời hạn đổi trả hàng trong vòng 30 ngày kể từ ngày nhận hàng. Sau thời gian đó, công ty Khánh
                        Anh không nhận trả lại hàng.
                    </p>
                    <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                        <br />
                    </p>
                </div>
                <table style={{ borderCollapse: 'collapse' }} cellSpacing={0}>
                    <tbody>
                        <tr style={{ height: '13pt' }}>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '1pt',
                                        paddingRight: '43pt',
                                        textIndent: '0pt',
                                        lineHeight: '12pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    Người mua hàng
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '43pt',
                                        paddingRight: '50pt',
                                        textIndent: '0pt',
                                        lineHeight: '12pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    Người bán hàng
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '43pt',
                                        paddingRight: '50pt',
                                        textIndent: '0pt',
                                        lineHeight: '12pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    Người xuất kho
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '50pt',
                                        paddingRight: '1pt',
                                        textIndent: '0pt',
                                        lineHeight: '12pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    Người kiểm soát
                                </p>
                            </td>
                        </tr>
                        <tr style={{ height: '13pt' }}>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '1pt',
                                        paddingRight: '43pt',
                                        textIndent: '0pt',
                                        lineHeight: '11pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    (Ký, họ tên)
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '43pt',
                                        paddingRight: '50pt',
                                        textIndent: '0pt',
                                        lineHeight: '11pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    (Ký, họ tên)
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '43pt',
                                        paddingRight: '50pt',
                                        textIndent: '0pt',
                                        lineHeight: '11pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    (Ký, họ tên)
                                </p>
                            </td>
                            <td>
                                <p
                                    className="s5"
                                    style={{
                                        paddingLeft: '50pt',
                                        paddingRight: '1pt',
                                        textIndent: '0pt',
                                        lineHeight: '11pt',
                                        textAlign: 'center',
                                    }}
                                >
                                    (Ký, họ tên,đóng dấu)
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style={{ textIndent: '0pt', textAlign: 'left' }}>
                <br />
            </p>
        </div>
    );
});

export default OrderPrint;
