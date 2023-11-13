import AxiosClient from '@/apis/AxiosClient';
import { Notification, uuid } from '@/utils';
import { Image, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import { UploadFile, UploadListType } from 'antd/lib/upload/interface';
import axios from 'axios';
import React, { ReactNode } from 'react';
// import axiosInstance, { ApiClient } from 'services/ApiService';
import styled from 'styled-components';
// import { notificationError } from 'utils/notification';
type uploadType = 'single' | 'list';
interface IProps {
    onSuccessUpload: (file: UploadFile | string | null) => void;

    isUploadServerWhenUploading?: boolean;
    isShowFileList?: boolean;
    children?: ReactNode;
    uploadType?: uploadType;
    accept?: string;
    listType?: UploadListType;
    maxLength?: number;
    initialFile?: any;
    disabled?: boolean;
}

const UploadComponent: React.FC<IProps> = ({
    accept = 'image/*',
    listType = 'text',
    uploadType = 'single',
    isShowFileList = true,
    isUploadServerWhenUploading = false,
    onSuccessUpload,
    children,
    maxLength = 5,
    initialFile,
    disabled,
}) => {
    const [files, setFiles] = React.useState<UploadFile[]>([]);
    const [progress, setProgress] = React.useState(0);
    const [visiblePreview, setVisiblePreview] = React.useState(false);

    const firstLoad = React.useRef(false);

    const uploadImage = async (options: any) => {
        const { onSuccess, onError, file, onProgress } = options;

        if (files.length > maxLength) {
            file.status = 'error';
            const error = new Error('Some error');
            if (uploadType === 'single') {
                setFiles([file]);
            } else {
                setFiles((f) => [...f.filter((_f) => _f.status !== 'uploading'), file]);
            }
            onError({ error });
            return Notification('error', 'Vượt quá số lượng cho phép');
        }
        if (isUploadServerWhenUploading) {
            const fmData = new FormData();
            const config = {
                headers: {
                    Accept: 'multipart/form-data',
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (event: any) => {
                    const percent = Math.floor((event.loaded / event.total) * 100);
                    setProgress(percent);
                    if (percent === 100) {
                        setTimeout(() => setProgress(0), 1000);
                    }
                    onProgress({ percent: (event.loaded / event.total) * 100 });
                },
            };
            fmData.append('file', file);
            try {
                const res: any = await AxiosClient.post('/files/upload/single/image', fmData, config);

                if (res.status) {
                    onSuccessUpload(res?.data as string);
                    onSuccess('ok');
                } else {
                    file.status = 'error';
                    const error = new Error('Some error');
                    if (uploadType === 'single') {
                        setFiles([file]);
                    } else {
                        setFiles((f) => [...f.filter((_f) => _f.status !== 'uploading'), file]);
                    }
                    onError({ error });
                }
            } catch (err) {
                file.status = 'error';
                const error = new Error('Some error');
                if (uploadType === 'single') {
                    setFiles([file]);
                } else {
                    setFiles((f) => [...f.filter((_f) => _f.status !== 'uploading'), file]);
                }
                onError({ error });
            }
        } else {
            setTimeout(() => onSuccess('ok'), 1000);
        }
    };

    const handleOnChange: UploadProps['onChange'] = ({ file, fileList, event }: any) => {
        // check size > 2mb reject
        if (file?.type === 'image/png' || file?.type === 'image/jpeg' || file?.type === 'image/jpg') {
            if (file?.size > 2 * 1024 * 1024) {
                file.status = 'error';

                return Notification('warning', 'Vui lòng tải ảnh có dung lượng ảnh nhỏ hơn 2 MB');
            }
        }

        // file type video
        if (file?.type === 'video/mp4') {
            if (file?.size > 5 * 1024 * 1024) {
                file.status = 'error';
                return Notification('warning', 'Vui lòng tải video có dung lượng nhỏ hơn 5 MB');
            }
        }

        if (file.status !== 'error') {
            setFiles(fileList);
        }
        if (file.status !== 'removed') {
            !isUploadServerWhenUploading && onSuccessUpload(file);
        }
    };

    const handlePreview = async (file: UploadFile) => {
        setVisiblePreview(true);
        return;
    };

    React.useEffect(() => {
        if (firstLoad?.current) return;
        if (initialFile) {
            setFiles(initialFile);
            firstLoad.current = true;
        }
    }, [initialFile]);

    return (
        <>
            <UploadStyled
                disabled={disabled}
                accept={accept}
                customRequest={uploadImage}
                onChange={handleOnChange}
                listType={listType}
                fileList={isShowFileList ? files : []}
                className="image-upload-grid"
                onPreview={handlePreview}
                onRemove={() => onSuccessUpload(null)}
            >
                {files.length >= maxLength ? null : uploadType === 'single' && files.length >= 1 ? null : listType ===
                  'text' ? (
                    children
                ) : (
                    <div>+</div>
                )}
            </UploadStyled>
            {listType !== 'text' && (
                <Image.PreviewGroup
                    preview={{
                        visible: visiblePreview,
                        onVisibleChange: (visible) => setVisiblePreview(visible),
                    }}
                >
                    {files.map((file: any, index: number) => {
                        return (
                            <Image
                                key={uuid()}
                                src={file?.thumbUrl || file.url}
                                // width={0}
                                style={{ display: 'none', width: '100%', height: '100%' }}
                            />
                        );
                    })}
                </Image.PreviewGroup>
            )}
        </>
    );
};

const UploadStyled = styled(Upload)`
    & img {
        object-fit: none !important;
    }
    & .ant-upload-list-picture-card .ant-upload-list-item,
    .ant-upload-list-picture .ant-upload-list-item {
        padding: 2px;
    }
`;

export default UploadComponent;
