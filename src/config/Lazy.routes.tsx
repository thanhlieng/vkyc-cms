import { Suspense } from 'react';
import { BarLoader } from 'react-spinners';

// public chứa những router không cần đăng nhập hoặc web view

const Lazy = ({ children }: { children: any }) => {
    return (
        <Suspense
            fallback={
                <div
                    style={{
                        height: '100vh',
                        width: '100%',
                        backgroundColor: 'rgba(0,0,0,.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <BarLoader />
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

export default Lazy;
