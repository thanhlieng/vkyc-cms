import React, { ReactNode } from 'react';
import * as AntdIcons from '@ant-design/icons';

const IconAntd = ({
    spin = false,
    icon,
    props,
    size = '20px',
    style,
}: {
    icon: any;
    size?: string;
    props?: any;
    spin?: boolean;
    style?: any;
}) => {
    //@ts-ignore
    const AntdIcon = AntdIcons[icon];

    return <AntdIcon spin={spin} style={{ fontSize: size, height: size, ...style }} {...props} />;
};

export default IconAntd;
