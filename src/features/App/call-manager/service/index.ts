import AxiosClient from '@/apis/AxiosClient';
import { RECORD_SIZE } from '@/config/theme';
import { handleObjectEmpty } from '@/utils';
import { DataTypeCustomer } from '../components/Customer.Config';
export interface IQuery {
    page: number;
    kiotvietId?: string | number;
    userId?: number;
}
export interface Export {
    search?: string;
    provinceId?: string;
    kiotvietId?: string;
    createFrom?: string;
    createTo?: string;
    status?: number;
    limit?: number;
}
export const CustomerService = {
    get: (params: IQuery) => {
        const url = `/admin/user`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
    detail: (id: number) => {
        const url = `/admin/user/${id}`;

        return AxiosClient.get(url);
    },
    update: (id: number, data: DataTypeCustomer) => {
        const url = `/admin/user/${id}`;
        return AxiosClient.patch(url, { ...data });
    },
    changeStatus: (id: number, status: number) => {
        const url = `/admin/user/${id}`;
        return AxiosClient.patch(url, { status });
    },
    changePassword: (id: number, password: string) => {
        const url = `/admin/user/${id}/password`;
        return AxiosClient.put(url, { password });
    },
    addDebt: (userId: number, debt: any) => {
        const url = `/admin/debit/${userId}`;
        return AxiosClient.post(url, debt);
    },
    exportExcel: (params: Export) => {
        const url = `/admin/user/export_to_excel`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams } });
    },
};

export const PurchaseService = {
    get: (params: IQuery) => {
        const url = `/admin/order`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: 8 } });
    },
};

export const DebitService = {
    get: (params: IQuery) => {
        const url = `/admin/debit`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
};
export const WalletChangeService = {
    get: (params: any) => {
        const url = `/admin/wallet_change`;
        const handleParams = handleObjectEmpty(params);
        return AxiosClient.get(url, { params: { ...handleParams, limit: RECORD_SIZE } });
    },
};
