import { Spin } from 'antd';
import React, { ReactNode } from 'react';
import { DotLoader } from 'react-spinners';

const Wrapper = ({ loading = true, children }: { loading?: boolean; children?: ReactNode }) => {
    return (
        <Spin spinning={loading} indicator={<DotLoader color="orange" />}>
            {children}
        </Spin>
    );
};

export default Wrapper;
