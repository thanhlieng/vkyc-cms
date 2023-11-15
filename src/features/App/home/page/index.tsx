import CardComponent from '@/components/CardComponent';
import TableComponent from '@/components/TableComponent';
import { BOX_SHADOW, RADIUS } from '@/config/theme';
import { supabase } from '@/supabaseClient';
import { Notification, momentToStringDate } from '@/utils';
import { Col, Row, Tooltip as TooltipAntd } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { columns } from '../../call-manager/components/Customer.Config';
import BarChartReport from '../components/BarChartReport';
import ChartReport from '../components/ChartReport';
import AreaChartReport from '../components/AreaChartReport';
const textReportStyle: any = {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '17px',
    textAlign: 'center',
    marginBottom: '4px',
};
const textNote = { color: '#fff', fontSize: '12px', fontWeight: '600' };

const HomePage = () => {
    const [dataChartAll, setDataChartAll] = useState<any>([]);
    const [dataChartToday, setDataChartToday] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataCall, setDataCall] = useState<any>([]);
    const [total, setTotal] = useState(0);
    const [totalSuccess, setTotalSuccess] = useState(0);
    const dataCallRef = useRef<any>([]);
    const dataAgencyRef = useRef<any>([]);
    const dataChartAllRef = useRef<any>([]);
    const dataChartTodayRef = useRef<any>([]);
    const totalRef = useRef<number>(0);
    const totalSuccessRef = useRef<number>(0);
    const navigate = useNavigate();

    const getDataChartAll = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('room')
                .select(`created_at,is_success, status`)
                .order('created_at', { ascending: true });

            if (data && data.length > 0) {
                const dataChart = data.reduce((acc: any, obj) => {
                    const date = obj.created_at;
                    const existingItem = acc.find(
                        (item: { name: string }) => item.name === momentToStringDate(date, 'daymonth')
                    );

                    if (existingItem) {
                        if (obj.is_success) {
                            existingItem.callSuccess++;
                        } else if (!obj.is_success && !obj.status) {
                            existingItem.callFail++;
                        }
                        existingItem.call++;
                    } else {
                        const newItem = {
                            name: momentToStringDate(date, 'daymonth'),
                            call: 1,
                            callSuccess: obj.is_success ? 1 : 0,
                            callFail: !obj.is_success && !obj.status ? 1 : 0,
                        };
                        acc.push(newItem);
                    }

                    return acc;
                }, []);
                dataChartAllRef.current = dataChart;
                setDataChartAll(dataChart);
            } else {
                dataChartAllRef.current = [];
                setDataChartAll([]);
            }
            if (error) {
                Notification('error', error);
            }
        } catch (error) {}
    }, []);

    const getDataChartToday = useCallback(async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const startOfToday = today.toISOString();
        const endOfToday = new Date(startOfToday);
        endOfToday.setHours(23, 59, 59, 999);
        const endOfTodayString = endOfToday.toISOString();
        try {
            const { data, error } = await supabase
                .from('room')
                .select(`created_at, is_success, status`)
                .gte('created_at', startOfToday)
                .lte('created_at', endOfTodayString)
                .order('created_at', { ascending: true });

            const dataSuccess = data?.filter((item) => item.is_success);
            const dataFail = data?.filter((item) => !item.is_success && !item.status);
            const dataProcess = data?.filter((item) => !item.is_success && item.status);

            console.log('aloo', dataSuccess?.length, dataFail?.length, dataProcess?.length);

            setDataChartToday([
                { name: 'Cuộc gọi thành công', value: dataSuccess?.length },
                { name: 'Cuộc gọi thất bại', value: dataFail?.length },
                { name: 'Cuộc gọi đang diễn ra', value: dataProcess?.length },
            ]);
            dataChartTodayRef.current = [
                { name: 'Cuộc gọi thành công', value: dataSuccess?.length },
                { name: 'Cuộc gọi thất bại', value: dataFail?.length },
                { name: 'Cuộc gọi đang diễn ra', value: dataProcess?.length },
            ];
            if (error) {
                Notification('error', error);
            }
        } catch (error) {}
    }, []);

    const getDataCall = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data, error, count } = await supabase
                .from('room')
                .select(
                    `id, room, status, user, is_occupied, video, created_at, updated_at,is_success,
                agency(id, name)`,
                    { count: 'exact' }
                )
                .order('updated_at', { ascending: false })
                .order('created_at', { ascending: false })
                .range(0, 4);

            const { data: dataAgency, error: errorAgency } = await supabase.from('agency').select();

            if (dataAgency && dataAgency.length > 0) {
                dataAgencyRef.current = dataAgency;
            }

            if (data && data.length > 0) {
                const newData = data?.map((item: any) => {
                    return {
                        ...item,
                        reciever: item.agency ? item.agency?.name.toString() : '',
                        updated_at: !item.status ? item.updated_at : '',
                        statusVKYC: item.is_success ? 1 : !item.is_success && !item.status ? 2 : 0,
                    };
                });
                totalRef.current = count ? count : 0;
                setTotal(count ? count : 0);
                dataCallRef.current = newData;
                setDataCall(newData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                dataCallRef.current = data;
                setDataCall(data);
            }
            if (error || errorAgency) {
                setIsLoading(false);
                Notification('error', error);
            }
        } catch (error) {
            setIsLoading(false);
        }
    }, []);

    const getTotalSuccess = useCallback(async () => {
        try {
            const { data } = await supabase.from('room').select(`id`).eq('status', false);

            if (data && data.length > 0) {
                setTotalSuccess(data.length);
                totalSuccessRef.current = data.length;
            }
        } catch (error) {}
    }, []);

    const handleRealtimeChartAll = (payload: { new: any; eventType?: string }) => {
        const newDataChartAll = [...dataChartAllRef.current];
        const existingItemChartAll = newDataChartAll.find(
            (item: { name: any }) => item.name === momentToStringDate(payload.new.created_at, 'daymonth')
        );
        if (existingItemChartAll) {
            existingItemChartAll.call += 1;
        } else {
            newDataChartAll.push({
                name: momentToStringDate(payload.new.created_at, 'daymonth'),
                call: 1,
                callSuccess: 0,
                callFail: 0,
            });
        }
        dataChartAllRef.current = newDataChartAll;
        setDataChartAll(newDataChartAll);
    };

    const handleRealtimeChartToday = (payload: { new: { created_at: string; is_success: boolean } }) => {
        if (new Date(payload.new.created_at).toDateString() === new Date().toDateString()) {
            const newDataChartToday = [...dataChartTodayRef.current];
            newDataChartToday[2].value += 1;
            dataChartTodayRef.current = newDataChartToday;
            setDataChartToday(newDataChartToday);
        }
    };

    const handleInsertDataRealtime = (data: any) => {
        const newDataCall = [...dataCallRef.current];
        newDataCall.unshift(data);
        newDataCall.pop();
        dataCallRef.current = newDataCall;
        setDataCall(newDataCall);
    };

    const handleUpdateDataChartAll = (payload: { new: any }) => {
        const newDataChartAll = [...dataChartAllRef.current];
        const existingItemChartAll = newDataChartAll.find(
            (item: { name: any }) => item.name === momentToStringDate(payload.new.created_at, 'daymonth')
        );
        if (existingItemChartAll) {
            if (payload.new.is_success) {
                existingItemChartAll.callSuccess += 1;
            } else if (!payload.new.is_success && !payload.new.status) {
                existingItemChartAll.callFail += 1;
            }
        } else {
            newDataChartAll.push({
                name: momentToStringDate(payload.new.created_at, 'daymonth'),
                call: 1,
                callSuccess: 0,
                callFail: 0,
            });
        }
        dataChartAllRef.current = newDataChartAll;
        setDataChartAll(newDataChartAll);
    };

    const handleUpdateDataChartToday = (payload: any) => {
        if (new Date(payload.new.created_at).toDateString() === new Date().toDateString()) {
            const newDataChartToday = [...dataChartTodayRef.current];
            if (payload.new.is_success) {
                newDataChartToday[0].value += 1;
                newDataChartToday[2].value -= 1;
            } else if (!payload.new.is_success && !payload.new.status) {
                newDataChartToday[1].value += 1;
                newDataChartToday[2].value -= 1;
            }

            dataChartTodayRef.current = newDataChartToday;
            setDataChartToday(newDataChartToday);
        }
    };

    const handleUpdateDateRealtime = (data: any, id: any) => {
        const newDataCall = [...dataCallRef.current];
        const index = newDataCall.findIndex((item) => item.id === id);
        if (index !== -1) {
            newDataCall.splice(index, 1)[0];
            newDataCall.unshift(data);
        } else {
            newDataCall.unshift(data);
            newDataCall.pop();
        }
        dataCallRef.current = newDataCall;
        setDataCall(newDataCall);
    };

    const findNameAgency = (id: any) => {
        const itemAgency = dataAgencyRef.current.find((item: { id: any }) => item.id == id);
        return itemAgency.name;
    };

    const handleDataChanged = async (payload: {
        new: {
            id: number;
            created_at: string;
            agency_id: number;
            status: boolean;
            updated_at: string;
            is_success: boolean;
        };
        eventType: string;
    }) => {
        console.log(payload);
        const newRow = {
            ...payload.new,
            reciever: payload.new.agency_id ? findNameAgency(payload.new.agency_id) : '',
            updated_at: !payload.new.status ? payload.new.updated_at : '',
            statusVKYC: payload.new.is_success ? 1 : !payload.new.is_success && !payload.new.status ? 2 : 0,
        };

        if (payload.eventType === 'INSERT') {
            Notification('info', 'Có cuộc gọi mới');
            handleRealtimeChartAll(payload);
            handleRealtimeChartToday(payload);
            handleInsertDataRealtime(newRow);
            setTotal(totalRef.current + 1);
            totalRef.current += 1;
            if (!payload.new.status) {
                setTotalSuccess(totalSuccessRef.current + 1);
                totalSuccessRef.current += 1;
            }
        } else if (payload.eventType === 'UPDATE') {
            Notification('info', `Cuộc gọi ${payload.new.id} đã được cập nhật`);
            handleUpdateDateRealtime(newRow, payload.new.id);
            handleUpdateDataChartToday(payload);
            handleUpdateDataChartAll(payload);
        }
    };

    useEffect(() => {
        getDataChartAll();
        getDataChartToday();
        getDataCall();
        getTotalSuccess();
        const myChannel = supabase
            .channel('database-changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'room' }, handleDataChanged)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'room' }, handleDataChanged)
            .subscribe();

        return () => {
            supabase.removeChannel(myChannel);
        };
    }, [getDataChartAll, getDataChartToday, getDataCall]);

    return (
        <ContainerStyled>
            <TitleHomeStyled>Tổng quan</TitleHomeStyled>
            <RowStyled className="gx-m-0 gx-p-0 gx-mb-3" justify="center">
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-2 gx-py-2">
                    <TooltipAntd color="#1890ff" title="Tổng số VKYC">
                        <ColStyled index={1}>
                            <div>
                                <div style={textReportStyle}>{total}</div>
                                <div style={textNote}>Tổng số VKYC</div>
                            </div>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
                <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24} className="gx-col-full gx-p-0 gx-px-2 gx-py-2">
                    <TooltipAntd color="#998CEB" title="Đã xử lý">
                        <ColStyled index={2}>
                            <div>
                                <div style={textReportStyle}>{totalSuccess}</div>
                                <div style={textNote}>Đã xử lý</div>
                            </div>
                        </ColStyled>
                    </TooltipAntd>
                </Col>
            </RowStyled>

            <div className="gx-m-0 row_home gx-mt-3 gx-mb-5 " style={{ display: 'flex' }}>
                <div className="home_left" style={{ flex: 1, height: '100%', marginRight: 20 }}>
                    <BarChartReport data={dataChartAll} label="Biển đồ tổng số cuộc gọi" />
                </div>
            </div>

            <div className="gx-m-0 row_home gx-mt-3 gx-mb-5 " style={{ display: 'flex' }}>
                <div className="home_left" style={{ flex: 1, height: '100%', marginRight: 20 }}>
                    <AreaChartReport data={dataChartAll} label="Biểu đồ trạng thái cuộc gọi" />
                </div>
                <div className="home_right" style={{ flex: 1, height: '100%' }}>
                    <ChartReport type="today" data={dataChartToday} label="Biểu đồ thống kê cuộc gọi hôm nay" />
                </div>
            </div>

            <CardComponent title="Cuộc gọi VKYC gần nhất">
                <TableComponent
                    page={1}
                    loading={isLoading}
                    rowSelect={false}
                    onChangePage={(_page) => {}}
                    onRowClick={(record: { id: number; room: string; video: string; status: boolean }) =>
                        navigate('/call-manager/detail' + '/' + record.id, {
                            state: {
                                roomName: record.room,
                                video: `https://api-vkyc.mascom.vn/file/${record.video}`,
                                status: record.status,
                            },
                        })
                    }
                    dataSource={dataCall ? dataCall : []}
                    columns={columns(1)}
                    total={5}
                />
            </CardComponent>

            <TitleHomeStyled />
        </ContainerStyled>
    );
};

const ContainerStyled = styled.div`
    width: 100%;
    height: 100%;
    flex: 1;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    max-height: 100vh;

    @media (max-width: 992px) {
        & .row_home {
            flex-direction: column;
        }
        & .home_left {
            flex: 1;
            width: 100%;
        }

        & .home_right {
            flex: 1;
            flex-direction: row !important;
            width: 100% !important;
            margin-left: 0 !important;
            margin-top: 13px;
        }
        & .date_picker {
            margin-right: 20px;
        }
    }
`;

const TopBoxStyled = styled.div`
    background-color: #fff;
    box-shadow: ${BOX_SHADOW};
    padding: 20px;
    border-radius: ${RADIUS};
`;

const RowStyled = styled(Row)`
    padding: 0 40px;
    margin: 30px 0;
`;

const ColStyled = styled(Col)<{ color?: string; index?: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 2px solid ${(props) => (props.color ? props.color : '#ccc')}; */
    padding: 14px 0;
    border-radius: ${RADIUS};
    position: relative;
    box-shadow: ${BOX_SHADOW};
    ${(props) =>
        props?.index === 1 &&
        'background-color: #0093E9;background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);'};
    ${(props) => props?.index === 2 && 'background: linear-gradient(33deg, #DEB0DF, #A16BFE);'};

    ${(props) => props?.index === 3 && 'background: linear-gradient(33deg, #54E38E, #41C7AF);'};
    ${(props) => props?.index === 4 && 'background: linear-gradient(33deg, #E16E93, #9D2E7D);'};
`;

const TitleColStyled = styled.div`
    position: absolute;
    top: -10px;
    background-color: white;
    padding: 0 20px;
    font-weight: bold;
`;

const TitleHomeStyled = styled.h2`
    font-weight: 700;
    font-size: 22px;
    padding: 10px 0;
    margin: 0;
`;

export default HomePage;
