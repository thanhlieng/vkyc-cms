import { Button } from 'antd';
import React from 'react';
import IconAntd from '../IconAntd';

const UnActiveButton = ({ onClick, disabled = false }: { onClick: () => void; disabled?: boolean }) => {
    return (
        <Button
            type="text"
            className="gx-mb-0"
            onClick={onClick}
            style={{
                fontSize: '16px',
                color: '#CC0000',
            }}
            disabled={disabled}
        >
            <IconAntd icon="CloseCircleOutlined" />
            Ngừng hoạt động
        </Button>
    );
};

export default React.memo(UnActiveButton);
