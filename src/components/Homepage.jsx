import React from "react";
import { Link } from "react-router-dom";

import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "./Loader";
import StockMarketNews from "./StockMarketNews";

const { Title } = Typography;

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    // console.log(data);

    if (isFetching) return <Loader />;

    return (
        <>
            <Title level={2} className=" heading title">
                Global Crypto Stats
            </Title>

            <Row gutter={[32, 32]}>
                <Col
                    xs={12}
                    md={8}
                >
                    <Statistic
                        title="Total Cryptocurrencies"
                        value={globalStats.total}
                    />
                </Col>

                <Col
                    xs={12}
                    md={8}
                >
                    <Statistic
                        title="Total Exchanges"
                        value={millify(globalStats.totalExchanges)}
                    />
                </Col>

                <Col
                    xs={12}
                    md={8}
                >
                    <Statistic
                        title="Total Market Cap:"
                        value={`$${millify(globalStats.totalMarketCap)}`}
                    />
                </Col>

                <Col
                    xs={12}
                    md={8}
                >
                    <Statistic
                        title="Total 24h Volume"
                        value={`$${millify(globalStats.total24hVolume)}`}
                    />
                </Col>

                <Col
                    xs={12}
                    md={8}
                >
                    <Statistic
                        title="Total Markets"
                        value={millify(globalStats.totalMarkets)}
                    />
                </Col>
            </Row>

            <div className="home-heading-container">
                <Title level={2} className="title">
                    Top 10 Cryptos In The World
                </Title>

                <Title level={3} className="show-more">
                    <Link to="/cryptocurrencies">Show more cryptos</Link>
                </Title>
            </div>

            <Cryptocurrencies simplified />

            <div className="home-heading-container">
                <Title level={2} className="title">
                    Latest Crypto News
                </Title>

                <Title level={3} className="show-more">
                    <Link to="/news">Show more news</Link>
                </Title>
            </div>

            <News simplified />

            <div className="home-heading-container">
                <Title level={2} className="title">
                    Stock Market News
                </Title>

                <Title level={3} className="show-more">
                    <Link to="/stock-market">More on stocks</Link>
                </Title>
            </div>

            <StockMarketNews simplified />
        </>
    );
};

export default Homepage;
