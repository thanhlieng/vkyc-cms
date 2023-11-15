import { BOX_SHADOW, RADIUS } from '@/config/theme';
import { Col, Row } from 'antd';
import React from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import styled from 'styled-components';

const AreaChartReport = (props: { data: any[]; label: string; type?: string }) => {
    return (
        <ReportChartStyled>
            <div style={{ margin: 10, marginBottom: 20, fontWeight: 'bold', alignSelf: 'center' }}>{props.label}</div>
            <BoxChart style={{ minHeight: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={props.data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                            type="monotone"
                            name="Cuộc gọi thành công"
                            dataKey="callSuccess"
                            stackId="1"
                            stroke="#00C49F"
                            fill="#00C49F"
                        />
                        <Area
                            type="monotone"
                            name="Cuộc gọi thất bại"
                            dataKey="callFail"
                            stackId="1"
                            stroke="#FFBB28"
                            fill="#FFBB28"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </BoxChart>
            {/* </div> */}
        </ReportChartStyled>
    );
};

const ReportChartStyled = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0px 30px 20px 10px;
    box-shadow: ${BOX_SHADOW};
    background-color: white;
    border-radius: ${RADIUS};
`;

const BoxChart = styled.div``;

export default React.memo(AreaChartReport);
