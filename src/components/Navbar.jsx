import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";

import { Button, Menu, Typography, Avatar, Switch } from 'antd';
import {
    // HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, 
    MenuOutlined
} from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';
import { menuItems } from '../data/menu';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    // const [isActiveMenu, setIsActiveMenu] = useState(false)

    const [screenSize, setScreenSize] = useState(undefined);

    const location = useLocation();

    const [current, setCurrent] = useState(menuItems.find(menuItem => location.pathname === menuItem.path).key);
    const [theme, setTheme] = useState('dark');

    const handleMenuClick = (item) => {
        const clicked = menuItems.find(menuItem => menuItem.key === item.key);

        // console.log('clicked ', item, clicked);
        setCurrent(clicked.key);
    }

    const changeTheme = (value) => {
        setTheme(value ? 'light' : 'dark');
    };

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 800) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    useEffect(() => {
        // console.log('visited ', location, menuItems.find(menuItem => location.pathname === menuItem.path));

        setCurrent(menuItems.find(menuItem => location.pathname === menuItem.path).key);
        setActiveMenu(false);

        if (screenSize > 800) {
            setActiveMenu(true);
        }
    }, [location, screenSize])

    return (
        <div className={`nav-container ${theme}`}>
            <div className="logo-container">
                <Avatar src={icon} size="large" />

                <Typography.Title level={2} className="logo">
                    <NavLink to="/">CryptoInfo</NavLink>
                </Typography.Title>

                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>

            {activeMenu && (
                <Menu
                    onClick={(e) => {
                        handleMenuClick(e)
                    }}
                    selectedKeys={[current]}
                    theme={theme}
                    mode="vertical"
                    items={menuItems}
                />

                // <Menu theme={theme}>
                //     <Menu.Item className={isActiveMenu && 'active'} icon={<HomeOutlined />}>
                //         <NavLink to="/" className={({ isActive }) =>
                //             isActive && setIsActiveMenu(true)
                //         }>Home</NavLink>
                //     </Menu.Item>

                //     <Menu.Item icon={<FundOutlined />}>
                //         <NavLink to="/cryptocurrencies">Cryptocurrencies</NavLink>
                //     </Menu.Item>

                //     <Menu.Item icon={<MoneyCollectOutlined />}>
                //         <NavLink to="/exchanges">Exchanges</NavLink>
                //     </Menu.Item>

                //     <Menu.Item icon={<BulbOutlined />}>
                //         <NavLink to="/news">News</NavLink>
                //     </Menu.Item>
                // </Menu>
            )}

            <div className="theme-switcher">
                <Switch
                    checked={theme === 'light'}
                    onChange={changeTheme}
                    checkedChildren="Light"
                    unCheckedChildren="Dark"
                />
            </div>
        </div>
    );
};

export default Navbar;
