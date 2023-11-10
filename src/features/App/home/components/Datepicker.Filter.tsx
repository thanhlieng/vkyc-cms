import React from 'react';
import { DateRange } from 'react-date-range';
import locale from 'date-fns/locale/vi';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import styled from 'styled-components';
import { BOX_SHADOW } from '@/config/theme';
import { momentToStringDate } from '@/utils';
import TagResult from '@/components/TagResult';

const DatepickerFilter = ({
    dateFilter,
    handleChangeDate,
}: {
    dateFilter: {
        fromDate: string;
        toDate: string;
    };
    handleChangeDate: any;
}) => {
    return (
        <WrapperStyled>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ paddingRight: '15px', fontWeight: 600 }}>Từ</span>{' '}
                <TagResult text={dateFilter?.fromDate.split('-').reverse().join('/')} color="#3D91FF" />
                <span style={{ padding: '0 15px', fontWeight: 600 }}>đến</span>{' '}
                <TagResult text={dateFilter?.toDate.split('-').reverse().join('/')} color="#3D91FF" />
            </div>
            <DateRange
                retainEndDateOnFirstSelection
                fixedHeight
                className="home_picker"
                locale={locale}
                showDateDisplay={false}
                onChange={handleChangeDate}
                moveRangeOnFirstSelection={false}
                maxDate={new Date()}
                shownDate={new Date()}
                ranges={[
                    {
                        startDate: new Date(dateFilter?.fromDate),
                        endDate: new Date(dateFilter?.toDate),
                        key: 'selection',
                    },
                ]}
            />
        </WrapperStyled>
    );
};

const WrapperStyled = styled.div`
    border-radius: 16px;
    box-shadow: ${BOX_SHADOW};
    background-color: white;
    padding: 15px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export default React.memo(DatepickerFilter);
