import { images } from '@/assets/imagesAssets';
import React from 'react';
import styled from 'styled-components';
const InfoLogin = () => {
    return (
        <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
                <img src="https://wieldy.g-axon.work/assets/images/appModule/neature.jpg" alt="Neature" />
            </div>
            <div className="gx-app-logo-wid">
                <h1>Đăng nhập</h1>
                <p>Bằng cách Đăng nhập, bạn có thể tận dụng các tính năng đầy đủ của các dịch vụ của chúng tôi.</p>
            </div>
            <LogoStyled className="gx-app-logo gx-py-4">
                <img alt="example" src={images.logo} />
            </LogoStyled>
        </div>
    );
};

const LogoStyled = styled.div`
    background-color: rgba(255, 255, 255, 0.5);
    padding: 6px 20px;
    border-radius: 10px;
`;

export default InfoLogin;
