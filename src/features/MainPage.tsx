import LocalStorage from '@/apis/LocalStorage';
import { routerPage } from '@/config/contants.routes';
import { AdminRoutes, AuthRoutes } from '@/config/routes';
import PageLayout from '@/layout';
import React from 'react';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

// config routes
const MainPage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    //let element = useRoutes(LocalStorage.getToken() ? AdminRoutes : AuthRoutes);
    let element = useRoutes(AdminRoutes);
    const [logged, setLogged] = React.useState(false);

    // React.useEffect(() => {
    //     return navigate('/');
    //     if (LocalStorage.getToken()) {
    //         setLogged(true);

    //         if (pathname === routerPage.register || pathname === routerPage.login) {
    //             return navigate('/');
    //         }
    //     } else {
    //         switch (pathname) {
    //             case routerPage.register:
    //                 navigate(routerPage.register);
    //                 break;
    //             default:
    //                 navigate(routerPage.login);
    //                 break;
    //         }
    //     }
    // }, [logged, pathname]);

    return element;
};

export default PageLayout(MainPage);
