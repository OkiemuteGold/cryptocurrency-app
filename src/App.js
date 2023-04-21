import React from 'react';

import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';

import './app.css';

function App() {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>

            <main className="main">
                <Layout className="contents">
                    <div className="routes">
                        <Routes>
                            <Route path='/' exact element={<Homepage />} />
                            <Route path='/exchanges' element={<Exchanges />} />
                            <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                            <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                            <Route path='/news' element={<News />} />
                        </Routes>
                    </div>
                </Layout>

                <div className="footer">
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
                </div>
            </main>
        </div>
    );
}

export default App;
