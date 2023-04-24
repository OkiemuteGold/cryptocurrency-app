import React from "react";
import { Link } from "react-router-dom";
import { BulbOutlined, FundOutlined, HomeOutlined, MoneyCollectOutlined, StockOutlined } from "@ant-design/icons";

export const menuItems = [
    {
        key: 'home',
        path: '/',
        icon: <HomeOutlined />,
        label: (
            <Link to="/" aria-label="home">
                Home
            </Link>
        ),
    },
    {
        key: 'cryptocurrencies',
        path: '/cryptocurrencies',
        icon: <FundOutlined />,
        label: (
            <Link to="/cryptocurrencies" aria-label="cryptocurrencies">
                Cryptocurrencies
            </Link>
        ),
    },
    {
        key: 'exchanges',
        path: '/exchanges',
        icon: <MoneyCollectOutlined />,
        label: (
            <Link to="/exchanges" aria-label="exchanges">
                Exchanges
            </Link>
        ),
    },
    {
        key: 'news',
        path: '/news',
        icon: <BulbOutlined />,
        label: (
            <Link to="/news" aria-label="news">
                News
            </Link>
        ),
    },
    {
        key: 'stock-market',
        path: '/stock-market',
        icon: <StockOutlined />,
        label: (
            <Link to="/stock-market" aria-label="stock-market">
                Stock &amp; Others
            </Link>
        ),
    },

    // {
    //     label: 'Navigation Three - Submenu',
    //     key: 'SubMenu',
    //     icon: <SettingOutlined />,
    //     children: [
    //         {
    //             type: 'group',
    //             label: 'Item 1',
    //             children: [
    //                 {
    //                     label: 'Option 1',
    //                     key: 'setting:1',
    //                 },
    //                 {
    //                     label: 'Option 2',
    //                     key: 'setting:2',
    //                 },
    //             ],
    //         },
    //         {
    //             type: 'group',
    //             label: 'Item 2',
    //             children: [
    //                 {
    //                     label: 'Option 3',
    //                     key: 'setting:3',
    //                 },
    //                 {
    //                     label: 'Option 4',
    //                     key: 'setting:4',
    //                 },
    //             ],
    //         },
    //     ],
    // },
];