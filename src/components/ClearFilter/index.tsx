import { wait } from '@/utils';
import { Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';
import IconAntd from '../IconAntd';

const ClearFilter = ({ onClick, hidden = false }: { onClick: any; hidden: boolean }) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <div style={{ visibility: hidden ? 'visible' : 'hidden' }}>
            <ClearFilterStyled
                style={{ transform: hidden ? 'scale(1)' : 'scale(0.5)' }}
                onClick={() => {
                    if (loading) return;
                    setLoading(true);
                    onClick();
                    wait(1400).then(() => setLoading(false));
                }}
            >
                {loading ? (
                    <IconAntd style={{ color: 'blue' }} spin icon="RedoOutlined" />
                ) : (
                    <IconAntd style={{ color: 'blue' }} icon="ClearOutlined" />
                )}
            </ClearFilterStyled>
        </div>
    );
};

const ClearFilterStyled = styled.div`
    position: fixed;
    top: 1.2%;
    left: 50%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
    transition: all 0.25s ease-in-out;
`;

export default React.memo(ClearFilter);
