import CustomScrollbars from '@/components/CustomScrollbars';
import UserInfo from '@/components/UserInfo';
import { TAB_SIZE } from '@/config/theme';
import useCallContext from '@/hooks/useCallContext';
import useWindowSize from '@/hooks/useWindowSize';
import { Menu } from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { itemsAdmin } from './Sidebar.Menu';

const SidebarContent = ({
    collapsed,
    handleCallbackCollapsed,
}: {
    collapsed?: boolean;
    handleCallbackCollapsed?: () => void;
}) => {
    const { state } = useCallContext();

    const location = useLocation();
    const navigate = useNavigate();
    const { width } = useWindowSize();
    console.log(location.pathname?.substr(1));
    const selectedKeys = location.pathname?.substr(1)?.includes('call-manager')
        ? 'call-manager'
        : location.pathname.substr(1) || '/';

    return (
        <>
            {/* <Row align="middle" className="gx-m-0 gx-layout-sider-header">
                {!collapsed && (
                    <Link className="gx-d-block gx-pointer" to="/">
                        <div
                            style={{
                                border: '2px solid rgba(255,255,255,0.7)',
                                backgroundColor: '#F5F5F5',
                                padding: '6px 10px',
                                borderRadius: '10px',
                            }}
                        >
                            <img height="25px" alt="logo_sidebar" src={logo_sidebar} />
                        </div>
                    </Link>
                )}
                <div className="gx-linebar" onClick={handleCallbackCollapsed}>
                    {collapsed ? (
                        <MenuUnfoldOutlined className="gx-icon-btn" />
                    ) : (
                        <MenuFoldOutlined className="gx-icon-btn" />
                    )}
                </div>
            </Row> */}
            <div className="gx-sidebar-content">
                {/* top sidebar */}
                <div
                    className={width > TAB_SIZE ? 'gx-sidebar-notifications gx-pb-3 gx-pb-5' : ''}
                    style={width < TAB_SIZE ? { padding: '10px 0 5px 24px' } : {}}
                >
                    {/* user info */}
                    <UserInfo />
                </div>

                {/* sidebar menu */}
                <CustomScrollbars className="gx-layout-sider-scrollbar">
                    <div className="gx-menu-group">
                        <MenuStyled
                            defaultOpenKeys={itemsAdmin.map((item: { key: string }) => item.key)}
                            selectedKeys={[selectedKeys]}
                            theme="dark"
                            mode="inline"
                            // items={itemsAdmin}
                            onClick={(e) => navigate(e.key === '/' ? e.key : '/' + e.key)}
                        >
                            {itemsAdmin.map(
                                (nav: {
                                    children: any[];
                                    key: React.Key | null | undefined;
                                    label:
                                        | string
                                        | number
                                        | boolean
                                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                        | React.ReactFragment
                                        | React.ReactPortal
                                        | null
                                        | undefined;
                                    icon:
                                        | string
                                        | number
                                        | boolean
                                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                        | React.ReactFragment
                                        | null
                                        | undefined;
                                }) =>
                                    nav.children && nav.children.length > 0 ? (
                                        <Menu.SubMenu
                                            key={nav.key}
                                            title={nav.label}
                                            icon={nav.icon}
                                            onTitleClick={handleCallbackCollapsed}
                                            popupClassName="d-none"
                                        >
                                            {nav.children.map((childNav) => (
                                                <Menu.Item key={childNav.key} title="">
                                                    <Link to={childNav.key || ''}>{childNav.label}</Link>
                                                </Menu.Item>
                                            ))}
                                        </Menu.SubMenu>
                                    ) : (
                                        <Menu.Item
                                            style={{ marginTop: 12, fontSize: 15 }}
                                            key={nav.key}
                                            title=""
                                            icon={nav.icon}
                                        >
                                            <Link to={nav.key?.toString() || ''}>{nav.label}</Link>
                                        </Menu.Item>
                                    )
                            )}
                        </MenuStyled>
                    </div>
                </CustomScrollbars>
            </div>
        </>
    );
};

const MenuStyled = styled(Menu)`
    * {
        font-weight: 600;
    }
`;

export default React.memo(SidebarContent);
