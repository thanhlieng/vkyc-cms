import AxiosClient from '@/apis/AxiosClient';
import { removeDuplicateIdInArray } from '@/utils';
import React, { useState } from 'react';
import DebounceSelect from './DebounceSelect';

const SelectMultiComponent = ({
    apiUrl,
    params,
    placeholder,
    onChange,
    defaultSelect,
    fieldShow = 'name',
    labelProp,
    showFirstField,
}: {
    apiUrl: string;
    params?: any;
    placeholder: string;
    onChange?: (id: any) => void;
    defaultSelect?: any;
    fieldShow?: string;
    labelProp: any;
    showFirstField?: boolean;
}) => {
    const [value, setValue] = useState<any>([]);
    const [defaultOption, setDefaultOption] = React.useState<any>([]);
    const [callback, setCallback] = React.useState(false);

    const fetchUserList = React.useCallback(
        async (search?: string) => {
            return AxiosClient(`${apiUrl}`, { params: { ...params, search, limit: 15 } }).then((body) =>
                body.data?.value
                    ? body.data.value.map((data: any) => ({
                          label: showFirstField
                              ? `${data[labelProp]}`
                              : labelProp
                              ? data[labelProp[0]] + ' - ' + data[labelProp[1]]
                              : `${data[labelProp]}`,
                          value: data.id,
                      }))
                    : body.data.map((data: any) => ({
                          label: showFirstField
                              ? `${data[labelProp]}`
                              : labelProp
                              ? data[labelProp[0]] + ' - ' + data[labelProp[1]]
                              : `${data[labelProp]}`,
                          value: data.id,
                      }))
            );
        },
        [apiUrl, params, labelProp]
    );

    React.useEffect(() => {
        fetchUserList().then((res) => {
            return setDefaultOption([...res]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, callback]);

    React.useEffect(() => {
        if (defaultSelect) {
            const mergeArray = removeDuplicateIdInArray(defaultOption.concat(defaultSelect));
            setDefaultOption(mergeArray);
            setValue(defaultSelect);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultSelect]);

    return (
        <DebounceSelect
            mode="multiple"
            maxTagCount={4}
            placeholder={placeholder}
            defaultOption={[...defaultOption]}
            allowClear
            value={value || undefined}
            fetchOptions={fetchUserList}
            onChange={(newValue: any) => {
                if (newValue[newValue?.length - 1]?.value === 'all') {
                    return onChange && onChange([{ label: 'Chọn tất cả', value: 'all' }]);
                }
                onChange && onChange(newValue ? newValue : undefined);
            }}
            onSelect={(e: any) => {
                // setCallback(!callback);
                if (e.value === 'all') {
                    setDefaultOption((prev: any) =>
                        prev.map((item: any) => {
                            return {
                                label: item.label,
                                value: item.value,
                                disabled: true,
                            };
                        })
                    );
                    // setValue([{ label: 'Chọn tất cả', value: 'all' }]);
                } else {
                    setValue((prev: any) => [...prev, e]);
                }
            }}
            onDeselect={(e: any) => {
                if (e.value === 'all') {
                    setDefaultOption((prev: any) =>
                        prev.map((item: any) => {
                            return {
                                label: item.label,
                                value: item.value,
                                disabled: false,
                            };
                        })
                    );
                    setValue([]);
                } else {
                    setValue((prev: any) => prev.filter((item: any) => +item?.value !== +e.value));
                }
            }}
            style={{ width: '100%' }}
            // onClear={() => setCallback(!callback)}
        />
    );
};

export default SelectMultiComponent;
