import AxiosClient from '@/apis/AxiosClient';

export const syncService = {
    sync: (id: number, type: string) => {
        return AxiosClient.post(`/admin/kiotviet/${id}/sync/${type}`);
    },
};
