import { RECORD_SIZE } from '@/config/theme';
import { Pagination } from 'antd';
import React from 'react';
import styled from 'styled-components';

/*
Todo-> noted component:
    - page: trang hiện tại -> example: 1,2,3...
    - total: tổng số bản ghi -> example: 10,20, ...
    - pageSize: tổng số bản ghi trên 1 trang ->  example: 5,10, ...

    - onChange: callback khi click số trang
*/
interface IProps {
    page: number;
    onChange: (page: number) => void;
    total: number;
    pageSize?: number;
}

const PaginationComponent: React.FC<IProps> = ({ page, total, pageSize = RECORD_SIZE, onChange }) => {
    return (
        <PaginationStyled
            onChange={(value) => onChange(value)}
            current={Number(page)}
            total={total}
            showSizeChanger={false}
            pageSize={pageSize}
            showQuickJumper={total > 120}
        />
    );
};

const PaginationStyled = styled(Pagination)``;

export default React.memo(PaginationComponent);
