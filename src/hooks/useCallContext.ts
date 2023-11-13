import { Store } from '@/context/store';
import { useContext } from 'react';

const useCallContext = () => {
    const ctx = useContext(Store);
    if (ctx === undefined) {
        throw new Error('useCallContext must be used with a useCallContextProvider');
    }

    return ctx;
};

export default useCallContext;
