import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { Button, Menu, Typography, Avatar, Switch } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

import icon from "../images/cryptocurrency.png";
import { menuItems } from "../data/menu";

import { changeTheme } from "../app/themeSlice";

const Navbar = () => {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const dispatch = useDispatch();

    const [activeMenu, setActiveMenu] = useState(true);
    // const [isActiveMenu, setIsActiveMenu] = useState(false)

    const [screenSize, setScreenSize] = useState(undefined);

    const location = useLocation();

    const [current, setCurrent] = useState("");
    const [theme, setTheme] = useState(null);

    const handleMenuClick = (item) => {
        const clicked = menuItems.find((menuItem) => menuItem.key === item.key);

        // console.log('clicked ', item, clicked);

        if (!location.pathname.includes("/crypto/")) {
            setCurrent(clicked.key);
        } else {
            setCurrent("");
        }
    };

    const handleThemeChange = (value) => {
        const mode = value ? "dark" : "light";

        localStorage.setItem("themeMode", JSON.stringify(mode));
        setTheme(mode);
    };

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
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

        if (!location.pathname.includes("/crypto/")) {
            setCurrent(
                menuItems.find(
                    (menuItem) => location.pathname === menuItem.path
                ).key
            );
            setActiveMenu(false);
        } else {
            setCurrent("");
        }

        if (screenSize > 800) {
            setActiveMenu(true);
        }
    }, [location, screenSize]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        let currentTheme = JSON.parse(localStorage.getItem("themeMode"));

        dispatch(changeTheme(currentTheme ? currentTheme : "light"));

        // eslint-disable-next-line
    }, [theme]);

    return (
        <div className="nav-container">
            <div className="logo-container">
                <NavLink to="/">
                    <Avatar src={icon} size="large" />
                </NavLink>

                <Typography.Title level={2} className="logo">
                    <NavLink to="/">CryptoInfo</NavLink>
                </Typography.Title>

                <Button
                    className="menu-control-container"
                    onClick={() => setActiveMenu(!activeMenu)}
                >
                    {!activeMenu ? (
                        <MenuOutlined aria-label="open menu button" />
                    ) : (
                        <CloseOutlined aria-label="close menu button" />
                    )}
                </Button>
            </div>

            {activeMenu && (
                <Menu
                    onClick={(e) => {
                        handleMenuClick(e);
                    }}
                    selectedKeys={[current]}
                    theme={themeMode}
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
                    checked={themeMode === "dark"}
                    onChange={handleThemeChange}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
            </div>
        </div>
    );
};

export default Navbar;
