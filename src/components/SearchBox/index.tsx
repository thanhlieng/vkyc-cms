import React, { ChangeEventHandler } from 'react';
import { SearchOutlined } from '@ant-design/icons';
interface IProps {
    styleName: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
}

const SearchBox: React.FC<IProps> = ({ styleName, placeholder, onChange, value }) => {
    return (
        <div style={{ flex: 1 }} className={`gx-search-bar ${styleName}`}>
            <div className="gx-form-group">
                <input
                    className="ant-input"
                    type="search"
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
                <span style={{ lineHeight: '26px' }} className="gx-search-icon gx-pointer">
                    <SearchOutlined />
                </span>
            </div>
        </div>
    );
};

export default React.memo(SearchBox);
