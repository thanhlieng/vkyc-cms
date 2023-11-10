import TagResult from '@/components/TagResult';
import { RECORD_SIZE } from '@/config/theme';
import { ORDER_STATUS } from '@/contants';
import { currencyFormat, momentToStringDate } from '@/utils';
import { ColumnsType } from 'antd/lib/table';
export interface DataTypeCustomer {
    id: number;
    code: string;
    fullName: string;
    createdAt: string;
    phoneNumber: string;
    address: string;
    gender: string;
    description: string;
    dateOfBirth: string;
    provinceId: string;
    status: number;
    updatedAt: string;
    totalOrder: number;
    totalProductBought: number;
    province: string;
    turnoverOfOrder: number;
    turnover: number;
}
export interface DataTypeDebt {
    id: number;
    code: string;
    fullName: string;
    createdAt: string;
    phoneNumber: string;
    address: string;
    gender: string;
    description: string;
    dateOfBirth: string;
    provinceId: string;
    status: number;
    updatedAt: string;
    totalOrder: number;
    totalProductBought: number;
    province: string;
    turnoverOfOrder: number;
    turnover: number;
}
export interface DataTypePurchase {
    id: number;
    code: string;
    fullName: string;
    createdAt: string;
    phoneNumber: string;
    address: string;
    gender: string;
    description: string;
    dateOfBirth: string;
    provinceId: string;
    status: number;
    updatedAt: string;
    totalOrder: number;
    totalProductBought: number;
    province: string;
    turnoverOfOrder: number;
    turnover: number;
}
export interface DataTypeWalletChange {
    id: number;
    code: string;
    fullName: string;
    createdAt: string;
    phoneNumber: string;
    address: string;
    gender: string;
    description: string;
    dateOfBirth: string;
    provinceId: string;
    status: number;
    updatedAt: string;
    totalOrder: number;
    totalProductBought: number;
    province: string;
    turnoverOfOrder: number;
    turnover: number;
}
export const columns = (page: number): ColumnsType<DataTypeCustomer> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Cuộc gọi vKYC',
        dataIndex: 'room',
        align: 'center',
    },
    {
        title: 'Thời gian bắt đầu gọi',
        dataIndex: 'created_at',
        align: 'center',
        render: (value: any) => momentToStringDate(value, 'dateTime'),
    },
    {
        title: 'Thời gian kết thúc',
        dataIndex: 'updated_at',
        align: 'center',
        render: (value: any) => (value ? momentToStringDate(value, 'dateTime') : ''),
    },
    {
        title: 'Người tiếp nhận',
        dataIndex: 'reciever',
        align: 'center',
    },
    {
        title: 'Trạng thái cuộc gọi',
        dataIndex: 'status',
        align: 'center',
        render: (value: boolean) =>
            !value ? (
                <TagResult text="Đã kết thúc" color="success" />
            ) : (
                <TagResult text="Đang diễn ra" color="processing" />
            ),
    },
];
