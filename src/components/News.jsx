import React, { useState } from "react";

import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery, useGetTrendingNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

    const { data } = useGetCryptosQuery(100);

    const { data: cryptoNews } = useGetCryptoNewsQuery({
        newsCategory,
        count: simplified ? 6 : 12,
    });

    const { data: trendingNews } = useGetTrendingNewsQuery({
        newsCategory: 'Business',
        count: 6,
    })

    if (!cryptoNews?.value) return <Loader />;

    console.log(cryptoNews, data, trendingNews?.value);

    return (
        // <>
        // </>
        <Row gutter={[24, 24]}>
            <Col span={24}>
                {!simplified && (
                    <Title level={2} className="home-title">
                        Top Cryptocurrency News
                    </Title>
                )}
            </Col>

            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select or search crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) =>
                            // console.log(input, option)
                            option.children[1]
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="" disabled>Select or search crypto</Option>

                        {data?.data?.coins?.map((currency, i) => (
                            <Option value={currency.name} key={i}>
                                <img
                                    src={currency.iconUrl}
                                    alt={currency.name}
                                    height={18}
                                    width={18}
                                />
                                {currency.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            )}

            <Col xs={24} xl={simplified ? 24 : 16}>
                <Row gutter={[24, 24]}>
                    {cryptoNews?.value.map((news, i) => (
                        <Col xs={24} sm={simplified && 12} xl={simplified && 8} key={i}>
                            <Card hoverable className={`news-card ${simplified && 'simplified'}`}>
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
            </Col>

            {!simplified && (
                <Col xs={24} xl={8} className="trending">
                    <Title level={3} className="home-title">
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
                </Col>
            )}
        </Row>
    );
};

export default News;
