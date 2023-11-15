import { BOX_SHADOW, RADIUS } from '@/config/theme';
import React, { useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import styled from 'styled-components';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const COLORS = ['#00C49F', '#FFBB28', '#0088FE'];

const renderActiveShape = (props: {
    cx: any;
    cy: any;
    midAngle: any;
    innerRadius: any;
    outerRadius: any;
    startAngle: any;
    endAngle: any;
    fill: any;
    payload: any;
    percent: any;
    value: any;
}) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                style={{ fontSize: 13 }}
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`PV ${value}`}</text>
            <text
                style={{ fontSize: 14 }}
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const ChartReport = (props: { data: any[]; label: string; type?: string }) => {
    const [activeIndex, setActiveIndex] = useState(1);

    const onPieEnter = (_: any, index: any) => {
        setActiveIndex(index);
    };
    return (
        <ReportChartStyled>
            <div style={{ margin: 10, marginBottom: 20, fontWeight: 'bold', alignSelf: 'center' }}>{props.label}</div>
            <BoxChart style={{ minHeight: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={props.data}
                            innerRadius={90}
                            outerRadius={125}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>

                        <Legend />
                    </PieChart>
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

export default React.memo(ChartReport);
