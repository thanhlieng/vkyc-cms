import HomePage from '@/features/App/home/page';
import Lazy from './Lazy.routes';
import { routerPage } from './contants.routes';
import CallManagerPage from '@/features/App/call-manager/pages';
import CallDetailPage from '@/features/App/call-manager/pages/detail';

// private router khi đã đăng nhập admin
const AdminRoutes = [
    {
        path: routerPage.home,
        element: (
            <Lazy>
                <HomePage />
            </Lazy>
        ),
    },

    // customer
    {
        path: routerPage.call_manager,
        element: (
            <Lazy>
                <CallManagerPage />
            </Lazy>
        ),
    },
    {
        path: routerPage.call_manager_detail,
        element: (
            <Lazy>
                <CallDetailPage />
            </Lazy>
        ),
    },
];

export default AdminRoutes;
