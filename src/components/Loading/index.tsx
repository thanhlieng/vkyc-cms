import { BounceLoader } from 'react-spinners';

const LoadingComponent = () => {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                zIndex: 999,
            }}
        >
            <div style={{ position: 'relative' }}>
                <BounceLoader style={{ height: '60px', width: '60px' }} color="orange" />
            </div>
        </div>
    );
};

export default LoadingComponent;
