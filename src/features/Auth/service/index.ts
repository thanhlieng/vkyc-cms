import AxiosClient from '@/apis/AxiosClient';

interface IDataLogin {
    phoneNumber: string;
    password: string;
}

interface IChangePassword {
    current_password: string;
    new_password: string
}

export const authService = {
    login: (data: IDataLogin) => {
        return AxiosClient.post('/admin/session', data);
    },
    info: () => {
        return AxiosClient.get('/admin/session/me');
    },
    changePassword: (data: IChangePassword) => {
        const url = `/admin/session/me/password`;
        return AxiosClient.patch(url, data);
    },
};
