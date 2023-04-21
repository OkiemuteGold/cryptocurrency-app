import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import millify from 'millify';
import { Card, Row, Col, Input, Typography } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);

        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />;

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input
                        placeholder="Search Cryptocurrency"
                        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    />
                </div>
            )}


            {searchTerm && cryptos.length === 0 && (
                <Typography.Title level={3} className="no-result text-center">
                    No result found for <span>'{searchTerm}'</span>
                </Typography.Title>
            )}

            <Row gutter={[25, 25]} className="crypto-card-container">
                {cryptos?.map((currency) => {
                    const { uuid, rank, name, iconUrl, price, marketCap, change } = currency;

                    return (
                        <Col
                            xs={24}
                            sm={12}
                            lg={6}
                            className="crypto-card"
                            key={uuid}
                        >
                            <Link key={uuid} to={`/crypto/${uuid}`}>
                                <Card
                                    title={`${rank}. ${name}`}
                                    extra={<img src={iconUrl} alt={name} className="crypto-image" />}
                                    hoverable
                                >
                                    <p>Price: {millify(price)}</p>
                                    <p>Market Cap: {millify(marketCap)}</p>
                                    <p>Daily Change: {change}%</p>
                                </Card>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
        </>
    );
};

export default Cryptocurrencies;
