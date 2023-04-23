import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography } from 'antd'

const defaultYear = 2023;
const currentYear = new Date().getFullYear();

const Footer = () => {
    const [year] = useState(currentYear);
    const [footerYear, setFooterYear] = useState(defaultYear);

    useEffect(() => {
        const timeline = `${defaultYear} - ${year}`;
        const copyrightYear = year > defaultYear ? timeline : defaultYear;
        setFooterYear(copyrightYear);
    }, [year]);

    return (
        <>
            <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                Copyright © {footerYear} { }
                <a href="https://github.com/OkiemuteGold" target="_blank" rel="noopener noreferrer">
                    OkiemuteGold
                </a>
            </Typography.Title>

            <Space>
                <Link to="/">Home</Link>
                <Link to="/exchanges">Exchanges</Link>
                <Link to="/news">News</Link>
            </Space>
        </>
    )
}

export default Footer
