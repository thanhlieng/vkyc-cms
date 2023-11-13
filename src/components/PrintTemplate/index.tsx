import { Col, Row, Table } from 'antd';
import moment from 'moment';
import React from 'react';
const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
];

const PrintTemplate = React.forwardRef((detailOrder?: any, ref?: any) => {
    return (
        <div ref={ref} style={{ padding: 40, backgroundColor: '#fff' }}>
            <Row
                style={{
                    width: '100%',
                    padding: '20px 35px 40px 35px',
                }}
                justify="space-between"
            >
                <Col style={{ textAlign: 'center', width: '45%' }}>
                    Công ty Cổ phần STAKA
                    <br />
                    MST: 0109083491
                    <br /> 15 - 17 Ngọc Khánh, Bà ĐÌnh, Hà Nội
                    <br /> Tel: 0903123456
                </Col>
                <Col style={{ textAlign: 'center', width: '45%' }}>Demo</Col>
            </Row>
            <div style={{ width: '100%', textAlign: 'center', padding: '0 0 30px 0' }}>
                <b style={{ fontSize: 32 }}>HÓA ĐƠN THANH TOÁN</b>
                <div>Số HĐ: #123demo</div>
            </div>
            <div>Ngày: {moment(new Date()).format('DD/MM/YYYY')}</div>
            <div>
                Giờ: {new Date().getHours()}h{moment(new Date()).format('mm')}
            </div>
            <div>Nhân viên:</div>
            <Row
                style={{
                    width: '100%',
                    padding: '0 80px 30px 0',
                }}
                justify="space-between"
            >
                <div>Khách hàng: Nguyễn Văn A</div>
            </Row>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
            <div
                style={{
                    textAlign: 'center',
                    width: '70%',
                    float: 'right',
                    padding: '20px 0 0 0',
                    fontStyle: 'italic',
                }}
            >
                <b>Trân trọng cảm ơn!</b>
                <div>(Hóa đơn đã bao gồm thuế GTGT)</div>
            </div>
        </div>
    );
});

export default React.memo(PrintTemplate);
