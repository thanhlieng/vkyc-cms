import audiobell from '@/assets/audio/sound.mp3';
import useCallContext from '@/hooks/useCallContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Socket = () => {
    const { state, dispatch } = useCallContext();
    const navigate = useNavigate();

    const audioRef: any = React.useRef();

    // joinUser
    // React.useEffect(() => {
    //     if (state.socket?.connected) {
    //         if (LocalStorage.getToken() && state?.info?.group !== ADMIN.news) {
    //             state.socket.on('notification:created', (data: any) => {
    //                 if (SYNC.includes(data?.data?.df_notification_id)) {
    //                     dispatch({ type: SET_SYNC_LOADING, payload: false });
    //                     message.open({
    //                         key: 'sync',
    //                         content: data?.data?.content,
    //                         duration: 2,
    //                         type: 'info',
    //                     });
    //                 } else {
    //                     notificationSync(
    //                         data?.data?.content,
    //                         data?.data?.title,
    //                         () => navigate(routerPage.order + '/' + data?.data?.data?.id),
    //                         ORDER_TYPE.includes(data?.data?.df_notification_id)
    //                     );
    //                 }

    //                 setTimeout(() => {
    //                     dispatch({
    //                         type: SET_COUNT_NOTI,
    //                     });
    //                 }, 2000);
    //             });
    //             state.socket.on('export_excel_event', (data: any) => {
    //                 downloadFileAllPage(data.data);
    //             });
    //         }
    //     }
    // }, [state.socket?.connected]);

    return (
        <>
            <audio controls ref={audioRef} style={{ display: 'none' }}>
                <source src={audiobell} type="audio/mp3" />
            </audio>
        </>
    );
};

export default Socket;
