import AxiosClient from '@/apis/AxiosClient';
import React from 'react';
import DebounceSelect from './DebounceSelect';

function SelectComponent({
    apiUrl,
    params,
    placeholder,
    onChange,
    defaultSelect,
    disabled,
    fieldShow = 'name',
    value,
}: {
    apiUrl: string;
    params?: any;
    placeholder: string;
    onChange?: (id: any) => void;
    defaultSelect?: any;
    disabled?: boolean;
    fieldShow?: string;
    value?: any;
    mode?: any;
}) {
    // const [value, setValue] = useState<any>(undefined);

    const [defaultOption, setDefaultOption] = React.useState<any>([]);

    const fetchUserList = React.useCallback(
        async (search?: string) => {
            return AxiosClient(`${apiUrl}`, { params: { ...params, search, limit: 15 } }).then((body) =>
                body.data.map((data: any) => ({
                    label: `${data[fieldShow] || '-'}`,
                    value: data.id,
                    ...data,
                }))
            );
        },
        [apiUrl, params, fieldShow]
    );

    React.useEffect(() => {
        if (disabled) return;
        fetchUserList().then((res) => {
            return setDefaultOption(res);
        });
    }, [disabled, params, apiUrl]);

    return (
        <DebounceSelect
            disabled={disabled}
            placeholder={placeholder}
            defaultOption={defaultOption}
            allowClear
            value={value || undefined}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
                onChange && onChange(newValue ? newValue : undefined);
            }}
            style={{ width: '100%', minWidth: '200px' }}
        />
    );
}

export default SelectComponent;
