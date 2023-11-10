import { Button } from 'antd';
import React from 'react';
import IconAntd from '../IconAntd';

const EditButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            type="default"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
            }}
            onClick={onClick}
            icon={<IconAntd size="16px" icon="EditOutlined" />}
        >
            Chỉnh sửa
        </Button>
    );
};

export default EditButton;
