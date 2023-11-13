import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ContextProvider } from './context/store';
import ErrorBoundary from './features/Error/ErrorBoundary';
// import * as moment from 'moment-timezone';
// import css
import 'antd/dist/antd.min.css';
import './overiseStyle/style.min.css';
// moment.tz.setDefault('Etc/UTC');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, // disable retry,
            refetchOnWindowFocus: false, // disable refetch on window focus,
            keepPreviousData: true, // keep previous data if query
            staleTime: 10000, // time cache data fetching,
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ContextProvider>
            <ErrorBoundary>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </ErrorBoundary>
        </ContextProvider>
    </BrowserRouter>
);
