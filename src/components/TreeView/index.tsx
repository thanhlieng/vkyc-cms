import React from 'react';
import './style.css';
const TreeView = ({ parent, children }: any) => {
    return (
        <div className="treeview">
            <ul style={{ paddingLeft: '6px', marginBottom: 0 }}>
                <li style={{ padding: 0 }}>
                    <div className="treeview__level">
                        <span className="level-title">{parent}</span>
                    </div>
                    <ul style={{ marginBottom: 0, paddingLeft: '30px' }}>
                        <li>
                            <div className="treeview__level">
                                <span className="level-title">{children}</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default TreeView;
