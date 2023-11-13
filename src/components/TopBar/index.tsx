import { BOX_SHADOW, RADIUS } from '@/config/theme';
import { PageHeader, Typography } from 'antd';
import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const { Title } = Typography;

const TopBar = ({
    title,
    extra,
    style,
    back,
}: {
    title: any;
    extra?: ReactNode;
    style?: React.CSSProperties;
    back?: boolean;
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <HeaderStyled
            ghost
            onBack={back ? () => navigate(location?.state?.prevUrl || -1, { state: location.state }) : undefined}
            title={title}
            style={style}
            extra={extra}
            // subTitle="This is a subtitle"
        />
    );
};
const HeaderStyled = styled(PageHeader)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 12px 20px;
    /* border-radius: ${RADIUS}; */
    box-shadow: ${BOX_SHADOW};
    /* margin-bottom: 10px; */

    position: sticky;
    top: 0;
    z-index: 1;

    & .ant-page-header-heading {
        width: 100%;
    }
`;
export default React.memo(TopBar);
