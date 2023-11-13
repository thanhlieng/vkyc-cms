import React from 'react';

const LoginPage = React.lazy(() => import('@/features/Auth/Login/pages'));

import RegisterPage from '@/features/Auth/Register';

import AdminRoutes from './Admin.routes';
import { routerPage } from './contants.routes';

// todo: auth router khi chưa đăng nhập
const AuthRoutes = [
    {
        path: routerPage.login,
        element: <LoginPage />,
    },
    {
        path: routerPage.register,
        element: <RegisterPage />,
    },
];

export { AdminRoutes, AuthRoutes };
