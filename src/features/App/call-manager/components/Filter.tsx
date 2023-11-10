import SearchInput from '@/components/SearchInput';
import { DefaultSelectStyled } from '@/config/global.style';
import { Space } from 'antd';

const Filter = ({ returnFilter }: { returnFilter: (filter: any) => void }) => {
    const handleChangeStatus = (value: any) => {
        returnFilter({ status: value });
    };
    return (
        <Space size="middle" wrap>
            <SearchInput
                onChangeSearch={(search) => returnFilter({ room: search })}
                placeholderSearch="Nhập cuộc gọi vKYC "
            />
            <DefaultSelectStyled
                placeholder="Trạng thái cuộc gọi"
                allowClear
                style={{ width: '250px' }}
                onChange={handleChangeStatus}
            >
                <DefaultSelectStyled.Option value={1}>Đã kết thúc</DefaultSelectStyled.Option>
                <DefaultSelectStyled.Option value={2}>Đang diễn ra</DefaultSelectStyled.Option>
            </DefaultSelectStyled>
        </Space>
    );
};

export default Filter;
