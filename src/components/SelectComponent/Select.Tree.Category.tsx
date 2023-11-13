import AxiosClient from '@/apis/AxiosClient';
import useDebounce from '@/hooks/useDebounce';
import { Tree, TreeSelect } from 'antd';
import React from 'react';
import TagResult from '../TagResult';

const SelectTreeCategory = ({
    placeholder,
    onChange,
    params,
    page,
    defaultValue
}: {
    placeholder: string;
    onChange: any;
    params?: any;
    page?: any;
    defaultValue?: any
}) => {
    const [search, setSearch] = React.useState('');
    const debouncedSearchTerm = useDebounce(search, 300);

    const treeSelectRef: any = React.useRef(null);

    const [valueSelected, setValueSelected] = React.useState<any>('');
    const [treeValueSelected, setTreeValueSelected] = React.useState<any>(undefined);

    const [loading, setLoading] = React.useState(false);

    const [categories, setCategories] = React.useState<any>([]);

    React.useEffect(() => {
        setLoading(true);
        AxiosClient(page === 'report' ? '/admin/product_category/sale_report' : `/admin/product_category`, {
            params: { ...params, search: debouncedSearchTerm, limit: 15 },
        })
            .then((res) => {
                const data = res.data.map((item: any) => ({
                    title: (
                        <div>
                            {item.name} <TagResult color="blue" text={item?.kiotviet?.name} />
                        </div>
                    ),
                    name: item.name,
                    value: item.id,
                    key: item.id,
                    children: item.listChild.map((child: any) => ({
                        title: child.name,
                        name: child.name,
                        value: child.id,
                        key: child.id,
                    })),
                }));
                setCategories(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [debouncedSearchTerm, params]);

    const onSelect = (newValue: any, { node }: any) => {
        setTreeValueSelected(node.name);
        treeSelectRef?.current?.blur();
        setValueSelected(newValue);
        onChange(newValue?.[0] || '', node.name);
    };

    const handleClearSelect = () => {
        setValueSelected('');
        onChange('', '');
        setTreeValueSelected(undefined);
        setSearch('');
    };

    React.useEffect(() => {
        if(defaultValue?.category_id && defaultValue?.category_name) {
            setTreeValueSelected(defaultValue?.category_name);
            setValueSelected([defaultValue?.category_id]);
        }
    },[defaultValue?.category_id,defaultValue?.category_name ]);

    return (
        <TreeSelect
            loading={loading}
            value={treeValueSelected}
            ref={treeSelectRef}
            dropdownRender={() => {
                return <Tree selectedKeys={valueSelected} onSelect={onSelect} defaultExpandAll treeData={categories} />;
            }}
            style={{ minWidth: '300px' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder={placeholder}
            allowClear
            showSearch
            onClear={handleClearSelect}
            searchValue={search}
            onSearch={(value) => setSearch(value)}
        />
    );
};

export default SelectTreeCategory;
