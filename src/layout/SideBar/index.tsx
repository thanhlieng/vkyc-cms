import { TAB_SIZE } from '@/config/theme';
import useWindowSize from '@/hooks/useWindowSize';
import { Drawer, Layout } from 'antd';
import React from 'react';
import SidebarContent from './SidebarContent';

const SideBar = ({
    collapsedMobile,
    handleCallbackCollapseMobile,
}: {
    collapsedMobile: boolean;
    handleCallbackCollapseMobile: () => void;
}) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const { width } = useWindowSize();

    const handleCallbackCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
            <Layout.Sider
                className={`gx-app-sidebar ${width < TAB_SIZE && 'gx-collapsed-sidebar'} ${
                    collapsed && 'gx-mini-sidebar'
                }  gx-layout-sider-dark`}
                trigger={null}
                collapsed={width < TAB_SIZE ? false : collapsed}
                collapsible
                theme="dark"
            >
                {width < TAB_SIZE ? (
                    <Drawer
                        className="gx-drawer-sidebar gx-drawer-sidebar-dark"
                        placement="left"
                        closable={false}
                        onClose={handleCallbackCollapseMobile}
                        open={collapsedMobile}
                    >
                        <SidebarContent />
                    </Drawer>
                ) : (
                    <SidebarContent handleCallbackCollapsed={handleCallbackCollapsed} collapsed={collapsed} />
                )}
            </Layout.Sider>
        </>
    );
};

export default React.memo(SideBar);
