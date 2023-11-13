import { disabledDate } from '@/utils';
import { DatePicker, Tooltip } from 'antd';
import React from 'react';
const { RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const dateFormat = 'DD/MM/YYYY';

const RangerPickerWithValue = ({
    name,
    onChange,
    tooltipTitle = 'Lọc theo ngày tạo',
    placeholderStart = 'Từ ngày',
    placeholderEnd = 'Đến ngày',
    defaultValue,
}: {
    name: string;
    onChange: any;
    tooltipTitle?: string;
    placeholderStart?: string;
    placeholderEnd?: string;
    defaultValue?: any;
}) => {
    return (
        <Tooltip title={tooltipTitle}>
            <RangePicker
                onChange={(date: any, dateStrings: string[]) => {
                    return onChange(
                        name,
                        date
                            ? `${dateStrings[0].split('/').reverse().join('-')},${dateStrings[1]
                                  .split('/')
                                  .reverse()
                                  .join('-')}`
                            : ''
                    );
                }}
                placeholder={[placeholderStart, placeholderEnd]}
                value={defaultValue}
                format={dateFormat}
                disabledDate={disabledDate}
            />
        </Tooltip>
    );
};

export default React.memo(RangerPickerWithValue);
