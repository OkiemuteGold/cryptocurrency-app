import React from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography } from 'antd'

const Footer = () => {
    return (
        <>
            <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                Copyright © 2023 { }
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
