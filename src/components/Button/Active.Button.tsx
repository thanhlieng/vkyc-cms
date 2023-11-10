import { Button } from 'antd';
import React from 'react';
import IconAntd from '../IconAntd';

const ActiveButton = ({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) => {
    return (
        <Button
            type="text"
            className="gx-mb-0"
            style={{
                fontSize: '16px',
                color: '#0090FF',
            }}
            onClick={onClick}
            disabled={disabled}
        >
            <IconAntd icon="CheckCircleOutlined" />
            Kích hoạt
        </Button>
    );
};

export default React.memo(ActiveButton);
