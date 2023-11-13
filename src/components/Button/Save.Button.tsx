import { images } from '@/assets/imagesAssets';
import { Button } from 'antd';
import { ButtonHTMLType } from 'antd/lib/button/button';
import Lottie from 'lottie-react';
import IconAntd from '../IconAntd';

const SaveButton = ({ onClick, htmlType = 'button' }: { onClick?: () => void; htmlType?: ButtonHTMLType }) => {
    return (
        <Button
            htmlType={htmlType}
            type="primary"
            className="gx-mb-0"
            onClick={onClick && onClick}
            style={{ display: 'flex', alignItems: 'center' }}
            icon={<IconAntd icon="SaveOutlined" />}
        >
            Lưu
        </Button>
    );
};

export default SaveButton;
