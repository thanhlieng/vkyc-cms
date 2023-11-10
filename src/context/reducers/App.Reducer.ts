import {
    APP_LOADING,
    IAction,
    InitialStateType,
    SET_BG_APP,
    SET_BG_APP_COLOR,
    SET_CALLBACK_KIOVIET,
    SET_COUNT_NOTI,
    SET_INFO,
    SET_KIOTVIETS,
    SET_SOCKET,
    SET_SYNC_LOADING,
    SET_BG_APP_FLOWER,
    SET_MODAL_CHANGE_PASSWORD,
} from '../types';

export const appReducer = (state: InitialStateType, action: IAction) => {
    switch (action.type) {
        case APP_LOADING: {
            return { ...state, appLoading: action.payload };
        }

        case SET_INFO: {
            return { ...state, info: action.payload };
        }

        case SET_KIOTVIETS: {
            return { ...state, kiotviets: action.payload };
        }

        case SET_SYNC_LOADING: {
            return { ...state, syncLoading: action.payload };
        }

        case SET_SOCKET: {
            return { ...state, socket: action.payload };
        }

        case SET_BG_APP: {
            return { ...state, appBackground: { ...state.appBackground, show: action.payload } };
        }

        case SET_BG_APP_FLOWER: {
            return { ...state, appBackground: { ...state.appBackground, showFlower: action.payload } };
        }

        case SET_BG_APP_COLOR: {
            return { ...state, appBackground: { ...state.appBackground, color: action.payload } };
        }

        case SET_COUNT_NOTI: {
            return { ...state, callbackNoti: !state.callbackNoti };
        }

        case SET_CALLBACK_KIOVIET: {
            return { ...state, callbackKioviet: !state.callbackKioviet };
        }

        case SET_MODAL_CHANGE_PASSWORD: {
            return { ...state, openModalChangePassword: !state.openModalChangePassword };
        }

        default: {
            throw new Error(`[appReducer] Unhandled action type: ${action.type}`);
        }
    }
};
