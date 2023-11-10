import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import { RECORD_SIZE } from '@/config/theme';
import Container from '@/layout/Container';
import { supabase } from '@/supabaseClient';
import { Notification, handleObjectEmpty, wait } from '@/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { columns } from '../components/Customer.Config';
import Filter from '../components/Filter';
const initialFilterQuery = {
    room: '',
    status: null,
};

const CallManagerPage = () => {
    const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [dataCall, setDataCall] = useState<any[] | null>([]);
    const dataCallRef = useRef<any>([]);
    const dataAgencyRef = useRef<any>([]);
    const [totalPage, setTotalPage] = React.useState(0);
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);

    const navigate = useNavigate();

    const getDataCall = useCallback(async () => {
        const offset = (page - 1) * RECORD_SIZE;
        setIsLoading(true);
        try {
            let query = supabase.from('room').select(
                `id, room, status, user, is_occupied, video, created_at, updated_at, 
                agency(id, name)`,
                { count: 'exact' }
            );
            if (filterQuery.room) {
                query.eq('room', filterQuery.room);
            }
            if (filterQuery.status) {
                query.eq('status', filterQuery.status === 1 ? false : true);
            }
            query
                .order('updated_at', { ascending: false })
                .order('created_at', { ascending: false })
                .range(offset, offset + RECORD_SIZE - 1);

            const { data, error, count } = await query;

            const { data: dataAgency, error: errorAgency } = await supabase.from('agency').select();

            if (dataAgency && dataAgency.length > 0) {
                dataAgencyRef.current = dataAgency;
            }

            if (data && data.length > 0 && count) {
                setTotalPage(count);
                const newData = data?.map((item: any) => {
                    return {
                        ...item,
                        reciever: item.agency ? item.agency?.name.toString() : '',
                        updated_at: !item.status ? item.updated_at : '',
                    };
                });
                dataCallRef.current = newData;
                setDataCall(newData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                dataCallRef.current = data;
                setDataCall(data);
                setTotalPage(count ? count : 0);
            }
            if (error || errorAgency) {
                setIsLoading(false);
                Notification('error', error);
            }
        } catch (error) {
            setIsLoading(false);
        }
    }, [page, filterQuery]);

    const handleInsertDataRealtime = (data: any) => {
        if (page === 1) {
            const newDataCall = [...dataCallRef.current];
            newDataCall.unshift(data);
            newDataCall.pop();
            dataCallRef.current = newDataCall;
            setDataCall(newDataCall);
        }
    };

    const handleUpdateDateRealtime = (data: any, id: any) => {
        if (page === 1) {
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
        }
    };

    const findNameAgency = (id: any) => {
        const itemAgency = dataAgencyRef.current.find((item: { id: any }) => item.id == id);
        return itemAgency.name;
    };

    const handleDataChanged = async (payload: {
        new: { id: number; created_at: string; agency_id: number; status: boolean; updated_at: string };
        eventType: string;
    }) => {
        console.log(payload);
        const newRow = {
            ...payload.new,
            reciever: payload.new.agency_id ? findNameAgency(payload.new.agency_id) : '',
            updated_at: !payload.new.status ? payload.new.updated_at : '',
        };

        if (payload.eventType === 'INSERT') {
            Notification('info', 'Có cuộc gọi mới');
            handleInsertDataRealtime(newRow);
        } else if (payload.eventType === 'UPDATE') {
            Notification('info', `Cuộc gọi ${payload.new.id} đã được cập nhật`);
            handleUpdateDateRealtime(newRow, payload.new.id);
        }
    };

    useEffect(() => {
        getDataCall();
        const myChannel = supabase
            .channel('database-changes')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'room' }, handleDataChanged)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'room' }, handleDataChanged)
            .subscribe();

        return () => {
            supabase.removeChannel(myChannel);
        };
    }, [getDataCall]);

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    const onClearFilter = () => {
        setLoadingClearFilter(true);
        wait(1500).then(() => {
            setFilterQuery(initialFilterQuery);
            setPage(1);
            setLoadingClearFilter(false);
        });
    };

    return (
        <>
            <TopBar title="Quản lý cuộc gọi" />
            <Container>
                <CardComponent
                    title={
                        loadingClearFilter ? (
                            <ClearFilterLoading key="clear_filter" />
                        ) : (
                            <Filter returnFilter={returnFilter} key="filter" />
                        )
                    }
                    // extra={<ExportButton key="extra_btn" onClick={handleExport} />}
                >
                    <TableComponent
                        showTotalResult
                        page={page}
                        loading={isLoading}
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        dataSource={dataCall ? dataCall : []}
                        columns={columns(page)}
                        onRowClick={(record: { id: number; room: string; video: string; status: boolean }) =>
                            navigate('/call-manager/detail' + '/' + record.id, {
                                state: {
                                    roomName: record.room,
                                    video: `http://103.23.135.42:5112/file/${record.video}`,
                                    status: record.status,
                                },
                            })
                        }
                        total={totalPage}
                    />
                </CardComponent>
            </Container>
            <ClearFilter
                hidden={
                    Object.values(handleObjectEmpty(filterQuery))?.filter(
                        (item: any) => item !== undefined && item !== ''
                    ).length > 0
                }
                onClick={onClearFilter}
            />
        </>
    );
};

export default CallManagerPage;
