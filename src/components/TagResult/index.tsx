import { Tag } from 'antd';
import React, { ReactNode } from 'react';

const TagResult = ({ text, color, style }: { text: string | ReactNode; color: string; style?: any }) => {
    return (
        <Tag className="gx-m-0" color={color} style={{ fontWeight: 700, ...style }}>
            {text}
        </Tag>
    );
};

export default TagResult;
