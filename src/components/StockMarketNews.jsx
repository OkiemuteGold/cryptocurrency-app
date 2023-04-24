import React, { useState } from "react";

import { Typography, Row, Col, Avatar, Card, Input, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import moment from "moment";

import { useGetCryptoNewsQuery, useGetTrendingNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

import demoImage from '../images/demo-image.png';

const { Text, Title } = Typography;

const StockMarketNews = ({ simplified }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [newsCategory, setNewsCategory] = useState("stock market");

    const { data: stockNews } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 15,
    });

    const { data: trendingNews } = useGetTrendingNewsQuery({
        newsCategory: 'business',
        count: 6,
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewsCategory(searchTerm);
    };

    if (!stockNews?.value) return <Loader />;

    // console.log(stockNews, trendingNews?.value);

    return (
        <>
            {!simplified && (
                <Typography.Title level={2} className="title text-center">
                    Stock Market &amp; Other News
                </Typography.Title>
            )}

            {!simplified && (
                <div className="search-crypto">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Input
                            placeholder="Enter a search term"
                            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                        />

                        <Tooltip title="search">
                            <button type="submit" className="button" onClick={(e) => handleSubmit(e)}>
                                <SearchOutlined />
                            </button>
                        </Tooltip>
                    </form>
                </div>
            )}

            <Row gutter={[24, 24]}>
                <Col xs={24} xl={simplified ? 24 : 16}>
                    <Row gutter={[24, 24]}>
                        {stockNews?.value.map((news, i) => (
                            <Col xs={24} sm={simplified && 12} xl={simplified && 8} key={i}>
                                <Card hoverable className={`news-card ${(simplified || !trendingNews?.value) && 'simplified'}`}>
                                    <a
                                        href={news.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="news-container"
                                    >
                                        <div className="news-image-container">
                                            <img
                                                src={
                                                    news?.image?.thumbnail?.contentUrl ||
                                                    demoImage
                                                }
                                                alt={news.name}
                                                className="img"
                                            />
                                        </div>

                                        <div className="news-description">
                                            <Title className="news-title" level={4}>
                                                {news.name.length > 55 ? `${news.name.substring(0, 55)}...` : news.name}
                                            </Title>

                                            <p>
                                                {news.description.length > 135
                                                    ? `${news.description.substring(0, 135)}...`
                                                    : news.description}
                                            </p>

                                            <div className="provider-container">
                                                <div className="provider-details">
                                                    <Avatar
                                                        src={
                                                            news.provider[0]?.image?.thumbnail
                                                                ?.contentUrl || demoImage
                                                        }
                                                        alt={news.provider[0]?.name}
                                                    />

                                                    <Text className="provider-name">
                                                        {news.provider[0]?.name}
                                                    </Text>
                                                </div>

                                                <Text className="date-posted">
                                                    {moment(news.datePublished)
                                                        .startOf("ss")
                                                        .fromNow()}
                                                </Text>
                                            </div>
                                        </div>
                                    </a>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {searchTerm && stockNews?.value.length === 0 && (
                        <p className="no-result text-center">
                            No result found for <span>'{searchTerm}'</span>
                        </p>
                    )}
                </Col>

                {!simplified && (
                    <Col xs={24} xl={8} className="trending">
                        <Title level={3} className="title">
                            Trending Business News
                        </Title>

                        <Row gutter={[24, 24]}>
                            {trendingNews?.value.slice(0, 6).map((news, i) => (
                                <Col xs={24} sm={12} xl={24} key={i}>
                                    <Card hoverable className="news-card">
                                        <a
                                            href={news.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="news-container"
                                        >
                                            <div className="news-image-container">
                                                <img
                                                    src={
                                                        news?.image?.thumbnail?.contentUrl ||
                                                        demoImage
                                                    }
                                                    alt={news.name}
                                                    className="img"
                                                />
                                            </div>

                                            <div className="news-description">
                                                <Title className="news-title" level={5}>
                                                    {news.name.length > 40 ? `${news.name.substring(0, 40)}...` : news.name}
                                                </Title>

                                                <p>
                                                    {news.description.length > 80
                                                        ? `${news.description.substring(0, 80)}...`
                                                        : news.description}
                                                </p>

                                                <div className="provider-container">
                                                    <div className="provider-details">
                                                        <Avatar
                                                            src={
                                                                news.provider[0]?.image?.thumbnail
                                                                    ?.contentUrl || demoImage
                                                            }
                                                            alt={news.provider[0]?.name}
                                                        />

                                                        <Text className="provider-name">
                                                            {news.provider[0]?.name}
                                                        </Text>
                                                    </div>

                                                    <Text className="date-posted">
                                                        {moment(news.datePublished)
                                                            .startOf("ss")
                                                            .fromNow()}
                                                    </Text>
                                                </div>
                                            </div>
                                        </a>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {!trendingNews?.value && (
                            <p className="no-result">
                                Trending business news not currently available
                            </p>
                        )}
                    </Col>
                )}
            </Row>
        </>
    );
};

export default StockMarketNews;
