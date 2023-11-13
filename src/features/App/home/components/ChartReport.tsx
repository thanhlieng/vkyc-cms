import { BOX_SHADOW, RADIUS } from '@/config/theme';
import { Col, Row, Tooltip as TooltipAntd } from 'antd';
import React from 'react';
import CountUp from 'react-countup';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

const ChartReport = (props: { data: any[]; label: string; type?: string }) => {
    return (
        <ReportChartStyled>
            <div style={{ margin: 10, marginBottom: 20, fontWeight: 'bold', alignSelf: 'center' }}>{props.label}</div>
            <BoxChart style={{ minHeight: '400px' }}>
                <ResponsiveContainer>
                    <LineChart
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
                        {/* <Line type="monotone" dataKey="call" stroke={'#8884d8'} strokeWidth={2} name="Cuộc gọi" /> */}
                        {props.type === 'total' ? (
                            <Line
                                type="monotone"
                                dataKey="call"
                                stroke={'#5bc0de'}
                                strokeWidth={2}
                                name="Cuộc gọi thành công"
                            />
                        ) : (
                            <>
                                {props.type === 'today' && (
                                    <Line
                                        type="monotone"
                                        dataKey="callProcess"
                                        stroke={'#5bc0de'}
                                        strokeWidth={2}
                                        name="Cuộc gọi đang diễn ra"
                                    />
                                )}

                                <Line
                                    type="monotone"
                                    dataKey="callSuccess"
                                    stroke={'#22bb33'}
                                    strokeWidth={2}
                                    name="Cuộc gọi thành công"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="callFail"
                                    stroke={'#bb2124'}
                                    strokeWidth={2}
                                    name="Cuộc gọi thất bại"
                                />
                            </>
                        )}
                    </LineChart>
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

const BoxChart = styled.div``;

export default React.memo(ChartReport);
