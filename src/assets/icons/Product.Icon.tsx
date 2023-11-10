import React from 'react';

const ProductIcon = ({ color }: { color?: string }) => {
    return (
        <div
            style={{
                padding: '4px',
                height: '50px',
                width: '50px',
                backgroundColor: 'white',
                borderRadius: '999px',
                border: `6.5px solid #5bb31880`,
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={color || 'currentColor'}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
            </svg>
        </div>
    );
};

export default ProductIcon;
