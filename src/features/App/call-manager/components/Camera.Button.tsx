import IconAntd from '@/components/IconAntd';
import type { TrackReference } from '@livekit/components-core';
import { useLocalParticipant, useTracks } from '@livekit/components-react';
import { Button } from 'antd';
import { ButtonHTMLType } from 'antd/lib/button/button';
import { LocalVideoTrack, RemoteVideoTrack, Track } from 'livekit-client';

export type onclickProps = {
    track: LocalVideoTrack | RemoteVideoTrack;
    type: string;
};

const CameraButton = ({
    onClick,
    htmlType = 'button',
    title,
    type,
}: {
    onClick?: (data: any) => void;
    htmlType?: ButtonHTMLType;
    title: string;
    type: string;
}) => {
    const t = useLocalParticipant()?.cameraTrack?.trackSid;
    const trackReferences: TrackReference[] = useTracks([Track.Source.Camera]);

    const click = () => {
        trackReferences.map((ele) => {
            console.log(ele.publication);
            if (ele.publication.kind == Track.Kind.Video && ele.publication.trackSid != t) {
                onClick && onClick({ track: ele.publication.videoTrack, type });
                return;
            }
        });
    };

    return (
        <Button
            htmlType={htmlType}
            type="primary"
            className="gx-mb-0"
            onClick={click}
            style={{ display: 'flex', alignItems: 'center' }}
            icon={<IconAntd icon="CameraOutlined" />}
        >
            {title}
        </Button>
    );
};

export default CameraButton;
