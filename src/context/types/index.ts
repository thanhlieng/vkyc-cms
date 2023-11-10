import { Socket } from 'socket.io-client';

export const APP_LOADING = 'APP_LOADING';
export const SET_INFO = 'SET_INFO';
export const SET_KIOTVIETS = 'SET_KIOTVIETS';
export const SET_SYNC_LOADING = 'SET_SYNC_LOADING';
export const SET_SOCKET = 'SET_SOCKET';
export const SET_BG_APP = 'SET_BG_APP';
export const SET_BG_APP_COLOR = 'SET_BG_APP_COLOR';
export const SET_COUNT_NOTI = 'SET_COUNT_NOTI';
export const SET_CALLBACK_KIOVIET = 'SET_CALLBACK_KIOVIET';
export const SET_BG_APP_FLOWER = 'SET_BG_APP_FLOWER';
export const SET_MODAL_CHANGE_PASSWORD = 'SET_MODAL_CHANGE_PASSWORD';


type ActionType =
    | typeof APP_LOADING
    | typeof SET_INFO
    | typeof SET_KIOTVIETS
    | typeof SET_SYNC_LOADING
    | typeof SET_SOCKET
    | typeof SET_BG_APP
    | typeof SET_COUNT_NOTI
    | typeof SET_CALLBACK_KIOVIET
    | typeof SET_BG_APP_COLOR
    | typeof SET_BG_APP_FLOWER
    | typeof SET_MODAL_CHANGE_PASSWORD;

export type InitialStateType = {
    appLoading: boolean;
    info: any;
    kiotviets: IKiotviet[] | null;
    syncLoading: boolean;
    socket: Socket | null;
    appBackground?: any;
    callbackNoti?: boolean;
    callbackKioviet?: boolean;
    openModalChangePassword?: boolean;
};

export interface IAction {
    type: ActionType;
    payload?: any;
}

export interface IKiotviet {
    id: number;
    retailer_id: number;
    name: string;
    client_id: string;
    client_secret: string;
    retailer: string;
    default_branch_id: number;
    default_branch_name: string;
    status: number;
    access_token: string;
    token_expires_at: string;
    deleted_at: null;
    created_at: string;
    updated_at: string;
    google_tokens: null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    kiotviet_id: number;
}
