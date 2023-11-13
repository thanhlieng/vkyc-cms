import { images } from '@/assets/imagesAssets';
import { MenuOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = ({ handleCallbackCollapseMobile }: { handleCallbackCollapseMobile: () => void }) => {
    const popoverRef = React.useRef(null);
    return (
        <>
            <Layout.Header>
                <div className="gx-linebar gx-mr-3">
                    <MenuOutlined className="gx-icon-btn" onClick={handleCallbackCollapseMobile} />
                </div>
                <Link className="gx-d-block gx-d-lg-none gx-pointer" to="/">
                    <img height={30} alt="" src={images.logo} />
                </Link>
                {/* <SearchBox
                    styleName="gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg"
                    placeholder="Tìm kiếm..."
                    onChange={(e) => setSearchText(e.target.value)}
                    value={SearchText}
                /> */}
                <ul className="gx-header-notifications gx-ml-auto">
                    {/* <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                        <Popover
                            overlayClassName="gx-popover-horizantal"
                            placement="bottomRight"
                            content={
                                <SearchBox
                                    styleName="gx-popover-search-bar"
                                    placeholder="Tìm kiếm..."
                                    onChange={(e) => setSearchText(e.target.value)}
                                    value={SearchText}
                                />
                            }
                            trigger="click"
                        >
                            <span className="gx-pointer gx-d-block">
                                <SearchOutlined />
                            </span>
                        </Popover>
                    </li> */}

                    {/* {width < TAB_SIZE && (
                        <>
                            <li className="gx-user-nav">
                                <UserInfo />
                            </li>
                        </>
                    )} */}
                </ul>
            </Layout.Header>
        </>
    );
};

export default Topbar;
