import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomScrollbars = (props: any) => {
    return (
        <Scrollbars
            {...props}
            autoHide
            universal
            renderTrackHorizontal={(props: any) => <div {...props} className="track-horizontal" />}
        />
    );
};

export default React.memo(CustomScrollbars);
