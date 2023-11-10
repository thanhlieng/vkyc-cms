import AxiosClient from '@/apis/AxiosClient';

export const homeService = {
    getDashboard: (dateFilter: any) => {
        return AxiosClient.get('/admin/overview', { params: { ...dateFilter } });
    },
};
