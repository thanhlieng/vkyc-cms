import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import IconAntd from '@/components/IconAntd';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { supabase } from '@/supabaseClient';
import { Notification } from '@/utils';
import { isEqualTrackRef } from '@livekit/components-core';
import {
    CarouselLayout,
    ControlBar,
    FocusLayout,
    FocusLayoutContainer,
    GridLayout,
    LayoutContextProvider,
    LiveKitRoom,
    ParticipantTile,
    RoomAudioRenderer,
    useCreateLayoutContext,
    useParticipants,
    usePinnedTracks,
    useRoomContext,
    useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Button, Col, Form, Image, Input, Row, Spin, Steps } from 'antd';
import axios from 'axios';
import { Track } from 'livekit-client';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CameraButton, { onclickProps } from '../components/Camera.Button';
const { Step } = Steps;

const CallDetailPage = () => {
    const axiosInstance = axios.create({
        //baseURL: 'https://myanmar-ekyc-staging.tunnel.techainer.com/burma',
        baseURL: 'https://api-vkyc.mascom.vn',
    });
    const location = useLocation();
    const [form] = Form.useForm();
    const { id } = useParams();
    const [frontImage, setFrontImage] = useState({ src: '', status: false });
    const [arrayFrontImage, setArrayFrontImage] = useState<any>([]);
    const arrayFrontImageRef = useRef<any>([]);
    const [arrayBackImage, setArrayBackImage] = useState<any>([]);
    const arrayBackImageRef = useRef<any>([]);
    const [arrayFaceImage, setArrayFaceImage] = useState<any>([]);
    const arrayFaceImageRef = useRef<any>([]);
    const [backImage, setBackImage] = useState({ src: '', status: false });
    const [face, setFace] = useState({ src: '', status: false, similarity: 0 });
    const [seeMore, setSeeMore] = useState(false);
    const [step, setStep] = useState(0);
    const [description, setDescription] = useState('');
    const [isLivestream, setIsLiveStream] = useState(location.state.status);
    const [isDisplayLiveStream, setIsDisplayLiveStream] = useState(false);
    const [isDisplayVideo, setIsDisplayVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [urlVideo, setUrlVideo] = useState(location.state.video ? location.state.video : '');
    const [token, setToken] = useState('');
    const frontImageRef = useRef('');
    const backImageRef = useRef('');
    const sessionIdRef = useRef('');

    const getDataDetailCall = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('request')
                .select(`*`)
                .eq('room_id', id)
                .order('created_at', { ascending: true });
            if (data && data.length > 0) {
                const findItemSession = data?.find((item) => item.url == '/session');
                if (findItemSession) {
                    form.setFieldValue('idSession', findItemSession.response.output.id);
                    sessionIdRef.current = findItemSession.response.output.id;
                }
                const arraydataOcrFront = data?.filter((item) => item.url === '/ocr-FR');
                const arraydataOcrBack = data?.filter((item) => item.url === '/ocr-BA');
                const arraydataFace = data?.filter((item) => item.url === '/face-compare');

                const arrayImageFront = arraydataOcrFront.map((item) => {
                    return {
                        src: `https://api-vkyc.mascom.vn/file/${item.image}`,
                        msg: item.response.error ? item.response.error : item.response.msg,
                    };
                });
                setArrayFrontImage(arrayImageFront);
                arrayFrontImageRef.current = arrayImageFront;

                const arrayImageBack = arraydataOcrBack.map((item) => {
                    return {
                        src: `https://api-vkyc.mascom.vn/file/${item.image}`,
                        msg: item.response.error ? item.response.error : item.response.msg,
                    };
                });
                setArrayBackImage(arrayImageBack);
                arrayBackImageRef.current = arrayImageBack;

                const arrayImageFace = arraydataFace.map((item) => {
                    return {
                        src: `https://api-vkyc.mascom.vn/file/${item.image}`,
                        msg: item.response.error ? item.response.error : item.response.msg,
                    };
                });
                setArrayFaceImage(arrayImageFace);
                arrayFaceImageRef.current = arrayImageFace;

                console.log(arrayFrontImage);

                const dataOcrFront = arraydataOcrFront[arraydataOcrFront.length - 1];
                const dataOcrBack = arraydataOcrBack[arraydataOcrBack.length - 1];
                const dataCompareFace = arraydataFace[arraydataFace.length - 1];

                if (dataOcrFront.response.code === 'SUCCESS' || dataOcrFront.response.code === 'Thành công') {
                    if (dataOcrBack.response.code === 'SUCCESS' || dataOcrBack.response.code === 'Thành công') {
                        if (
                            dataCompareFace.response.code === 'SUCCESS' ||
                            dataCompareFace.response.code === 'Thành công'
                        ) {
                            setStep(3);
                            setDescription('Waiting');
                        } else {
                            setStep(2);
                            setDescription(dataCompareFace.response.error);
                        }
                    } else {
                        setStep(1);
                        setDescription(dataOcrBack.response.error);
                    }
                } else {
                    setStep(0);
                    setDescription(dataOcrFront.response.error);
                }

                if (dataOcrFront.response.output) {
                    const resultOcrFront = dataOcrFront.response.output;
                    form.setFieldsValue({
                        name: resultOcrFront.name,
                        birthday: resultOcrFront.card_date_of_birth_normalized,
                        gender: resultOcrFront.card_gender == 'MA' ? 'Nam' : 'Nữ',
                        address: resultOcrFront.card_address,
                        documentType: resultOcrFront.card_type.includes('CC') ? 'Căn cước công dân' : '',
                        documentNumber: resultOcrFront.card_id,
                    });
                }
                if (dataOcrFront) {
                    setFrontImage({
                        src: `https://api-vkyc.mascom.vn/file/${dataOcrFront.image}`,
                        status: dataOcrFront.response.error ? false : true,
                    });
                    frontImageRef.current = `https://api-vkyc.mascom.vn/file/${dataOcrFront.image}`;
                }
                if (dataOcrBack.response.output) {
                    const resultOcrBack = dataOcrBack.response.output;
                    form.setFieldsValue({
                        issueDate: resultOcrBack.card_issued_date_normalized,
                        issueAddress: resultOcrBack.card_place_of_issue,
                    });
                }
                if (dataOcrBack) {
                    setBackImage({
                        src: `https://api-vkyc.mascom.vn/file/${dataOcrBack.image}`,
                        status: dataOcrBack.response.error ? false : true,
                    });
                    backImageRef.current = `https://api-vkyc.mascom.vn/file/${dataOcrBack.image}`;
                }
                if (dataCompareFace) {
                    setFace({
                        src: `https://api-vkyc.mascom.vn/file/${dataCompareFace.image}`,
                        status: dataCompareFace.response.error ? false : true,
                        similarity: dataCompareFace.response.output.similarity * 100,
                    });
                }
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
            if (error) {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
        }
    }, []);

    const getToken = useCallback(() => {
        if (isLivestream) {
            const apiUrl = 'https://api-vkyc.mascom.vn/room/agent';
            const data = {
                roomId: id,
                agentName: 'Agency1',
            };

            axios
                .post(apiUrl, data)
                .then((response) => {
                    setToken(response.data.data.token);
                })
                .catch((error) => {
                    console.error('Lỗi:', error);
                });
        }
    }, [isLivestream]);

    const handleDataDetailInsert = (payload: {
        new: { room_id: string; url: string; response: any; image: string };
        eventType: string;
    }) => {
        if (payload.new.room_id == id) {
            Notification('info', 'Thông tin cuộc gọi đang được cập nhật');
            const newItemImage = {
                src: `https://api-vkyc.mascom.vn/file/${payload.new.image}`,
                msg: payload.new.response.error ? payload.new.response.error : payload.new.response.msg,
            };

            if (payload.new.url == '/session') {
                form.setFieldValue('idSession', payload.new.response.output.id);
                return;
            }
            if (payload.new.url == '/ocr-FR') {
                if (!form.getFieldValue('idSession')) {
                    getDataDetailCall();
                    return;
                }
                const newArrayImageFront = [...arrayFrontImageRef.current];
                newArrayImageFront.push(newItemImage);
                setArrayFrontImage(newArrayImageFront);
                arrayFrontImageRef.current = newArrayImageFront;
                if (payload.new.response.code == 'SUCCESS' || payload.new.response.code == 'Thành công') {
                    setStep(1);
                    setDescription('');
                } else {
                    setDescription(payload.new.response.error);
                }
                if (payload.new.image) {
                    setFrontImage({
                        src: `https://api-vkyc.mascom.vn/file/${payload.new.image}`,
                        status: payload.new.response.error ? false : true,
                    });
                    frontImageRef.current = `https://api-vkyc.mascom.vn/file/${payload.new.image}`;
                }
                if (payload.new.response.output) {
                    form.setFieldsValue({
                        name: payload.new.response.output.name,
                        birthday: payload.new.response.output.card_date_of_birth_normalized,
                        gender: payload.new.response.output.card_gender == 'MA' ? 'Nam' : 'Nữ',
                        address: payload.new.response.output.card_address,
                        documentType: payload.new.response.output.card_type.includes('CC') ? 'Căn cước công dân' : '',
                        documentNumber: payload.new.response.output.card_id,
                    });
                }
                return;
            }
            if (payload.new.url == '/ocr-BA') {
                if (frontImageRef.current == '') {
                    getDataDetailCall();
                    return;
                }
                const newArrayImageBack = [...arrayBackImageRef.current];
                newArrayImageBack.push(newItemImage);
                setArrayBackImage(newArrayImageBack);
                arrayBackImageRef.current = newArrayImageBack;
                if (payload.new.response.code == 'SUCCESS' || payload.new.response.code == 'Thành công') {
                    setStep(2);
                    setDescription('');
                } else {
                    setDescription(payload.new.response.error);
                }

                if (payload.new.image) {
                    setBackImage({
                        src: `https://api-vkyc.mascom.vn/file/${payload.new.image}`,
                        status: payload.new.response.error ? false : true,
                    });
                    backImageRef.current = `https://api-vkyc.mascom.vn/file/${payload.new.image}`;
                }
                if (payload.new.response.output) {
                    form.setFieldsValue({
                        issueDate: payload.new.response.output.card_issued_date_normalized,
                        issueAddress: payload.new.response.output.card_place_of_issue,
                    });
                }

                return;
            }
            if (payload.new.url == '/face-compare') {
                if (backImageRef.current == '') {
                    getDataDetailCall();
                    return;
                }
                const newArrayImageFace = [...arrayFaceImageRef.current];
                newArrayImageFace.push(newItemImage);
                setArrayFaceImage(newArrayImageFace);
                arrayFaceImageRef.current = newArrayImageFace;
                if (payload.new.response.code == 'SUCCESS' || payload.new.response.code == 'Thành công') {
                    setStep(3);
                    setDescription('Waiting');
                } else {
                    setDescription(payload.new.response.error);
                }
                setFace({
                    src: `https://api-vkyc.mascom.vn/file/${payload.new.image}`,
                    status: payload.new.response.error ? false : true,
                    similarity: payload.new.response.output.similarity * 100,
                });
            }
        }
    };
    const handleDataRoomUpdate = (payload: {
        new: { id: string; video: string; status: boolean };
        eventType: string;
    }) => {
        if (payload.new.id == id) {
            setTimeout(() => {
                setIsLiveStream(payload.new.status);
                setUrlVideo(`https://api-vkyc.mascom.vn/file/${payload.new.video}`);
            }, 3000);
        }
    };

    useEffect(() => {
        getToken();
        const myChannel = supabase
            .channel('request-changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'request' }, handleDataDetailInsert)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'room' }, handleDataRoomUpdate)
            .subscribe();

        return () => {
            supabase.removeChannel(myChannel);
        };
    }, [getToken]);

    useEffect(() => {
        getDataDetailCall();
    }, [getDataDetailCall]);

    const ocrImage = async (key: string, urlBase64: string) => {
        console.log(urlBase64);
        try {
            fetch(urlBase64)
                .then((res) => res.blob())
                .then(async (blob) => {
                    console.log('blob', blob);
                    const fd = new FormData();
                    const file = new File([blob], 'filename.jpg');
                    if (key !== 'portrait_image') {
                        fd.append('isFront', key == 'front_image' ? 'true' : 'false');
                    }

                    fd.append('sessionId', sessionIdRef.current);
                    fd.append('image', file);
                    console.log('file', file);

                    switch (key) {
                        case 'front_image':
                            try {
                                await axiosInstance.post('/vkyc/ocr', fd, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                setIsLoading(false);
                            } catch (error) {}

                            break;
                        case 'back_image':
                            try {
                                await axiosInstance.post('/vkyc/ocr', fd, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                setIsLoading(false);
                            } catch (error) {}

                            break;
                        case 'portrait_image':
                            try {
                                await axiosInstance.post('/vkyc/face-compare', fd, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                });
                                setIsLoading(false);
                            } catch (error) {
                                console.log('error', error);
                            }

                            break;

                        default:
                            break;
                    }
                });
        } catch (error) {}
    };

    const captureScreenShot = (value: onclickProps, typeImage?: string) => {
        if (value.track.mediaStream) {
            setIsLoading(true);
            const videoStream = value.track.mediaStream;
            console.log(videoStream);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const stream = new MediaStream(videoStream);
            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;
            videoElement.play().then().catch();
            videoElement.onloadedmetadata = () => {
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                //ctx.translate(videoElement.videoWidth, 0);
                // ctx.scale(-1, 1);
                if (ctx) {
                    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                }

                const imageDataURL = canvas.toDataURL('image/jpeg');

                console.log(imageDataURL);

                switch (value?.type) {
                    case 'front':
                        ocrImage('front_image', imageDataURL);

                        break;
                    case 'back':
                        ocrImage('back_image', imageDataURL);
                        break;
                    case 'face':
                        ocrImage('portrait_image', imageDataURL);
                        break;

                    default:
                        break;
                }
            };
        }
    };

    const getSession = () => {
        if (!sessionIdRef.current) {
            const apiUrl = 'https://api-vkyc.mascom.vn/vkyc/session';
            const data = {
                roomId: id,
            };
            setIsLoading(true);
            axios
                .post(apiUrl, data)
                .then((response) => {
                    setIsLoading(false);
                    sessionIdRef.current = response.data.output.id;
                    setIsDisplayLiveStream(true);
                    console.log(response.data);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error('Lỗi:', error);
                });
        } else {
            setIsDisplayLiveStream(true);
        }
    };

    return (
        // <div style={{ height: '100vh' }}>
        <Spin spinning={isLoading} size="large" style={{ marginTop: 200, height: '100vh' }}>
            <div style={{ height: '100vh' }}>
                <FormComponent form={form} onSubmit={(values: any) => {}}>
                    <TopBar title={`Thông tin cuộc gọi ${id}`} />
                    <Container>
                        <CardComponent>
                            <div
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#2A8CCC',
                                    marginBottom: 15,
                                    marginTop: 20,
                                }}
                            >
                                Quy trình thực hiện
                            </div>

                            <Steps style={{ marginBottom: 20 }} size="small" current={step}>
                                <Step
                                    description={
                                        step === 0 ? (
                                            <div style={{ color: 'red', fontSize: 13 }}>{description}</div>
                                        ) : (
                                            ''
                                        )
                                    }
                                    title="OCR Mặt trước"
                                />
                                <Step
                                    description={
                                        step === 1 ? (
                                            <div style={{ color: 'red', fontSize: 13 }}>{description}</div>
                                        ) : (
                                            ''
                                        )
                                    }
                                    title="OCR Mặt sau"
                                />
                                <Step
                                    description={
                                        step === 2 ? (
                                            <div style={{ color: 'red', fontSize: 13 }}>{description}</div>
                                        ) : (
                                            ''
                                        )
                                    }
                                    title="So sánh khuôn mặt"
                                />
                                <Step
                                    description={
                                        step === 3 ? (
                                            <div style={{ color: 'red', fontSize: 13 }}>{description}</div>
                                        ) : (
                                            ''
                                        )
                                    }
                                    title="Hậu kiểm"
                                />
                            </Steps>
                            <Row>
                                <Col xs={24} sm={24} lg={10}>
                                    <div
                                        style={{ fontSize: 16, fontWeight: '600', color: '#2A8CCC', marginBottom: 15 }}
                                    >
                                        Thông tin người đại diện
                                    </div>
                                    <Row>
                                        <FormItemComponent
                                            name="name"
                                            label="Họ và tên"
                                            inputField={
                                                <Input readOnly style={{ height: 40 }} placeholder="Nhập họ tên" />
                                            }
                                        />
                                        <FormItemComponent
                                            name="birthday"
                                            label="Ngày sinh"
                                            inputField={
                                                <Input readOnly style={{ height: 40 }} placeholder="Nhập ngày sinh" />
                                            }
                                        />
                                        <FormItemComponent
                                            name="gender"
                                            label="Giới tính"
                                            inputField={
                                                <Input readOnly style={{ height: 40 }} placeholder="Nhập giới tính" />
                                            }
                                        />
                                        <FormItemComponent
                                            name="address"
                                            label="Địa chỉ"
                                            inputField={
                                                <Input readOnly style={{ height: 40 }} placeholder="Nhập địa chỉ" />
                                            }
                                        />
                                        <FormItemComponent
                                            name="documentType"
                                            label="Loại giấy tờ"
                                            inputField={
                                                <Input
                                                    readOnly
                                                    style={{ height: 40 }}
                                                    placeholder="Nhập loại giấy tờ"
                                                />
                                            }
                                        />
                                        <FormItemComponent
                                            name="documentNumber"
                                            label="Số giấy tờ"
                                            inputField={
                                                <Input readOnly style={{ height: 40 }} placeholder="Nhập số giấy tờ" />
                                            }
                                        />
                                        <FormItemComponent
                                            name="issueDate"
                                            label="Ngày cấp"
                                            inputField={
                                                <Input readOnly style={{ height: 40 }} placeholder="Nhập ngày cáp" />
                                            }
                                        />
                                        <FormItemComponent
                                            name="issueAddress"
                                            label="Nơi cấp"
                                            inputField={
                                                <Input readOnly style={{ height: 40 }} placeholder="Nhập nơi cấp" />
                                            }
                                        />
                                        <FormItemComponent
                                            name="idSession"
                                            label="Mã cuộc gọi"
                                            inputField={
                                                <Input readOnly style={{ height: 40 }} placeholder="Mã cuộc gọi" />
                                            }
                                        />
                                    </Row>
                                </Col>
                                <Col xs={24} sm={24} lg={14}>
                                    {isLivestream ? (
                                        <>
                                            {isDisplayLiveStream ? (
                                                <>
                                                    <div style={{ height: '72vh' }}>
                                                        <div
                                                            style={{
                                                                fontSize: 16,
                                                                fontWeight: '600',
                                                                color: '#2A8CCC',
                                                                marginBottom: 15,
                                                            }}
                                                        >
                                                            Cuộc gọi VKYC
                                                        </div>
                                                        <LiveKitRoom
                                                            video={true}
                                                            audio={true}
                                                            token={token}
                                                            connectOptions={{ autoSubscribe: true }}
                                                            serverUrl={'wss://test-lr2tmegs.livekit.cloud'}
                                                            data-lk-theme="default"
                                                            style={{ height: '100%' }}
                                                        >
                                                            <MyVideoConference setIsLiveStream={setIsLiveStream} />
                                                            <RoomAudioRenderer />
                                                            <LayoutButtonCamera
                                                                step={step}
                                                                captureScreenShot={captureScreenShot}
                                                            />
                                                        </LiveKitRoom>
                                                    </div>
                                                </>
                                            ) : (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Button
                                                        type="primary"
                                                        className="gx-mb-0"
                                                        style={{ display: 'flex', alignItems: 'center' }}
                                                        onClick={getSession}
                                                        icon={<IconAntd icon="PhoneOutlined" />}
                                                    >
                                                        Tham gia hỗ trợ
                                                    </Button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {isDisplayVideo ? (
                                                <ReactPlayer
                                                    width="100%"
                                                    url={urlVideo}
                                                    playing={false}
                                                    controls={true}
                                                />
                                            ) : (
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Button
                                                        type="primary"
                                                        className="gx-mb-0"
                                                        style={{ display: 'flex', alignItems: 'center' }}
                                                        onClick={() => {
                                                            setIsDisplayVideo(true);
                                                        }}
                                                        //icon={<IconAntd icon="PhoneOutlined" />}
                                                    >
                                                        Video VKYC
                                                    </Button>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Col>
                            </Row>

                            {!seeMore ? (
                                <Row style={{ marginTop: isLivestream ? 130 : 15 }}>
                                    {frontImage.src && (
                                        <ViewImageStyled>
                                            <div style={{ marginBottom: 15, fontSize: 14.5, fontWeight: '600' }}>
                                                Chứng minh nhân dân mặt trước
                                            </div>
                                            {frontImage.src && (
                                                <>
                                                    <Image src={frontImage.src} />
                                                    <div
                                                        style={{
                                                            marginTop: 10,
                                                            fontWeight: 'bold',
                                                            color: frontImage.status ? 'green' : 'red',
                                                        }}
                                                    >
                                                        {frontImage.status ? 'Pass' : 'Fail'}
                                                    </div>
                                                </>
                                            )}
                                        </ViewImageStyled>
                                    )}
                                    {backImage.src && (
                                        <ViewImageStyled>
                                            <div style={{ marginBottom: 15, fontSize: 14.5, fontWeight: '600' }}>
                                                Chứng minh nhân dân mặt sau
                                            </div>
                                            {backImage.src && (
                                                <>
                                                    <Image src={backImage.src} />
                                                    <div
                                                        style={{
                                                            marginTop: 10,
                                                            fontWeight: 'bold',
                                                            color: backImage.status ? 'green' : 'red',
                                                        }}
                                                    >
                                                        {backImage.status ? 'Pass' : 'Fail'}
                                                    </div>
                                                </>
                                            )}
                                        </ViewImageStyled>
                                    )}
                                    {face.src && (
                                        <ViewImageStyled>
                                            <div style={{ marginBottom: 15, fontSize: 14.5, fontWeight: '600' }}>
                                                Ảnh chân dung
                                            </div>
                                            {face.src && (
                                                <>
                                                    <Image src={face.src} />
                                                    <div
                                                        style={{
                                                            marginTop: 10,
                                                            fontWeight: 'bold',
                                                            color: face.status ? 'green' : 'red',
                                                        }}
                                                    >
                                                        {face.status
                                                            ? `Độ chính xác: ${face.similarity.toFixed()}%`
                                                            : 'Fail'}
                                                    </div>
                                                </>
                                            )}
                                        </ViewImageStyled>
                                    )}
                                </Row>
                            ) : (
                                <>
                                    {arrayFrontImage.length > 0 && (
                                        <Col>
                                            <div
                                                style={{
                                                    marginBottom: 15,
                                                    marginTop: isLivestream ? 120 : 0,
                                                    fontSize: 14.5,
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Chứng minh nhân dân mặt trước
                                            </div>
                                            <Row>
                                                {arrayFrontImage.map((item: any, index: number) => {
                                                    return (
                                                        <ViewImageStyled key={index}>
                                                            <Image src={item.src} />
                                                            <div
                                                                style={{
                                                                    marginTop: 10,
                                                                    fontWeight: 'bold',
                                                                    color:
                                                                        item.msg == 'SUCCESS' ||
                                                                        item.msg == 'Thành công'
                                                                            ? 'green'
                                                                            : 'red',
                                                                }}
                                                            >
                                                                {item.msg == 'SUCCESS' ? 'Pass' : item.msg}
                                                            </div>
                                                        </ViewImageStyled>
                                                    );
                                                })}
                                            </Row>
                                        </Col>
                                    )}
                                    {arrayBackImage.length > 0 && (
                                        <Col>
                                            <div
                                                style={{
                                                    marginBottom: 15,
                                                    fontSize: 14.5,
                                                    fontWeight: '600',
                                                    marginTop: 10,
                                                }}
                                            >
                                                Chứng minh nhân dân mặt sau
                                            </div>
                                            <Row>
                                                {arrayBackImage.map((item: any, index: number) => {
                                                    return (
                                                        <ViewImageStyled key={index}>
                                                            <Image src={item.src} />
                                                            <div
                                                                style={{
                                                                    marginTop: 10,
                                                                    fontWeight: 'bold',
                                                                    color:
                                                                        item.msg == 'SUCCESS' ||
                                                                        item.msg == 'Thành công'
                                                                            ? 'green'
                                                                            : 'red',
                                                                }}
                                                            >
                                                                {item.msg == 'SUCCESS' ? 'Pass' : item.msg}
                                                            </div>
                                                        </ViewImageStyled>
                                                    );
                                                })}
                                            </Row>
                                        </Col>
                                    )}
                                    {arrayFaceImage.length > 0 && (
                                        <Col>
                                            <div
                                                style={{
                                                    marginBottom: 15,
                                                    fontSize: 14.5,
                                                    marginTop: 10,
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Ảnh chân dung
                                            </div>
                                            <Row>
                                                {arrayFaceImage.map((item: any, index: number) => {
                                                    return (
                                                        <ViewImageStyled key={index}>
                                                            <Image src={item.src} />
                                                            <div
                                                                style={{
                                                                    marginTop: 10,
                                                                    fontWeight: 'bold',
                                                                    color:
                                                                        item.msg == 'SUCCESS' ||
                                                                        item.msg == 'Thành công'
                                                                            ? 'green'
                                                                            : 'red',
                                                                }}
                                                            >
                                                                {item.msg == 'SUCCESS' ? 'Pass' : item.msg}
                                                            </div>
                                                        </ViewImageStyled>
                                                    );
                                                })}
                                            </Row>
                                        </Col>
                                    )}
                                </>
                            )}
                            {(frontImage.src || backImage.src || face.src) && (
                                <Button
                                    onClick={() => {
                                        setSeeMore(!seeMore);
                                    }}
                                    style={{ marginTop: 10 }}
                                >
                                    {seeMore ? 'Thu gọn' : 'Xem chi tiết'}
                                </Button>
                            )}
                        </CardComponent>
                    </Container>
                </FormComponent>
            </div>
        </Spin>
        // </div>
    );
};

const MyVideoConference = ({ setIsLiveStream }: { setIsLiveStream: Dispatch<SetStateAction<boolean>> }) => {
    const roomContext = useRoomContext();
    const layoutContext = useCreateLayoutContext();
    const num = useParticipants();
    const prevNumParticipants = useRef(0);

    // `useTracks` returns all camera and screen share tracks. If a user
    // joins without a published camera track, a placeholder track is returned.
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false }
    );

    const focusTrack = usePinnedTracks(layoutContext)?.[0];
    const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));

    useEffect(() => {
        console.log(roomContext.state, num.length);
        if (prevNumParticipants.current == 0 && num.length == 2) {
            prevNumParticipants.current = 2;
        }
        if (prevNumParticipants.current == 2 && num.length == 1) {
            setIsLiveStream(false);
        }
    }, [num.length]);

    return (
        <LayoutContextProvider value={layoutContext}>
            {!focusTrack ? (
                <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
                    <ParticipantTile />
                </GridLayout>
            ) : (
                <div className="lk-focus-layout-wrapper">
                    <FocusLayoutContainer>
                        <CarouselLayout tracks={carouselTracks}>
                            <ParticipantTile />
                        </CarouselLayout>
                        {focusTrack && <FocusLayout track={focusTrack} />}
                    </FocusLayoutContainer>
                </div>
            )}
            <ControlBar controls={{ leave: false, screenShare: false }} style={{ marginTop: 10 }} />
        </LayoutContextProvider>
    );
};
const LayoutButtonCamera = ({
    step,
    captureScreenShot,
}: {
    step: number;
    captureScreenShot: (value: onclickProps, typeImage?: string) => void;
}) => {
    return (
        <Row
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
            }}
        >
            {/* <CameraButton
                title={'Front ID Card'}
                onClick={(data) => {
                    captureScreenShot(data, 'image/jpeg');
                }}
                type={'front'}
            /> */}
            <CameraButton
                title={step == 0 ? 'Front ID Card' : step == 1 ? 'Back ID Card' : 'Portrait'}
                onClick={(data) => {
                    captureScreenShot(data, 'image/jpeg');
                }}
                type={step == 0 ? 'front' : step == 1 ? 'back' : 'face'}
            />
            {/* <CameraButton
                title={'Portrait'}
                onClick={(data) => {
                    captureScreenShot(data, 'image/jpg');
                }}
                type={'face'}
            /> */}
        </Row>
    );
};

const ViewImageStyled = styled.div`
    margin-left: 15px;
    margin-right: 20px;
    max-width: 230px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    align-items: center;
`;
const TitleHomeStyled = styled.h2`
    font-weight: 700;
    font-size: 22px;
    padding: 10px 0;
    margin: 0;
`;
export default CallDetailPage;
