import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar, Footer } from './components';

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
                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default App;
