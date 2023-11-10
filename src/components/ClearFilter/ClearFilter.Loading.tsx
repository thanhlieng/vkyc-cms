import { Skeleton, Space } from 'antd';

const ClearFilterLoading = () => {
    return (
        <Space>
            <Skeleton.Input active />
            <Skeleton.Input active />
            <Skeleton.Input active />
        </Space>
    );
};

export default ClearFilterLoading;
