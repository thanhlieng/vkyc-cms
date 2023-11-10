import { Button } from 'antd';
import React from 'react';
import IconAntd from '../IconAntd';
import Lottie from 'lottie-react';
import { images } from '@/assets/imagesAssets';

const ExportButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button
            style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgb(37, 150, 194)', color: 'white' }}
            icon={
                <div style={{ height: '24px', width: '24px', marginRight: '10px' }}>
                    <Lottie animationData={images.excel} loop={true} />
                </div>
            }
            key="btn_export"
            className="gx-mb-0"
            onClick={onClick}
        >
            Export
        </Button>
    );
};

export default ExportButton;
