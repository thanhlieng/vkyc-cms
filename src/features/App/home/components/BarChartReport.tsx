import { BOX_SHADOW, RADIUS } from '@/config/theme';
import { Col, Row } from 'antd';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

const BarChartReport = (props: { data: any[]; label: string; type?: string }) => {
    return (
        <ReportChartStyled>
            <div style={{ margin: 10, marginBottom: 20, fontWeight: 'bold', alignSelf: 'center' }}>{props.label}</div>
            <BoxChart style={{ minHeight: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={props.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="call" stroke="#0088FE" name="Tổng số cuộc gọi" fill="#0088FE" />
                    </BarChart>
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

export default React.memo(BarChartReport);
