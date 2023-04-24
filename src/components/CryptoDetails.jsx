import React, { useState } from "react";
import { useParams } from "react-router-dom";

import HTMLReactParser from "html-react-parser";
import millify from "millify";

import { Col, Row, Typography, Select } from "antd";
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined,
    GlobalOutlined,
    GithubOutlined,
    FilePdfOutlined,
    FileSearchOutlined,
    RedditOutlined,
    SendOutlined,
    FacebookOutlined,
    YoutubeOutlined,
    TwitterOutlined,
    InstagramOutlined,
    MediumOutlined,
    WeiboOutlined,
    CustomerServiceOutlined,
    WechatOutlined,
} from "@ant-design/icons";

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const params = useParams();
    const coinId = params?.coinId;

    const [timePeriod, setTimePeriod] = useState("7d");

    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: cryptoHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    const cryptoDetails = data?.data?.coin;
    const coinHistory = cryptoHistory?.data;

    // console.log(coinHistory, cryptoDetails);

    if (isFetching) return <Loader />;

    const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

    const stats = [
        {
            title: "Price to USD",
            value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: "Rank",
            value: cryptoDetails?.rank,
            icon: <NumberOutlined />
        },
        {
            title: "24h Volume",
            value: `${cryptoDetails?.volume && millify(cryptoDetails?.volume)
                }`,
            icon: <ThunderboltOutlined />,
        },
        {
            title: "Market Cap",
            value: `$${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
                }`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: "All-time-high",
            value: `$${cryptoDetails?.allTimeHigh?.price &&
                millify(cryptoDetails?.allTimeHigh?.price)
                }`,
            icon: <TrophyOutlined />,
        },
    ];

    const genericStats = [
        {
            title: "Number Of Markets",
            value: cryptoDetails?.numberOfMarkets,
            icon: <FundOutlined />,
        },
        {
            title: "Number Of Exchanges",
            value: cryptoDetails?.numberOfExchanges,
            icon: <MoneyCollectOutlined />,
        },
        {
            title: "Approved Supply",
            value: cryptoDetails?.supply?.confirmed ? (
                <CheckOutlined />
            ) : (
                <StopOutlined />
            ),
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Total Supply",
            value: `$ ${cryptoDetails?.supply?.total &&
                millify(cryptoDetails?.supply?.total)
                }`,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Circulating Supply",
            value: `$ ${cryptoDetails?.supply?.circulating &&
                millify(cryptoDetails?.supply?.circulating)
                }`,
            icon: <ExclamationCircleOutlined />,
        },
    ];

    const allLinkTypes = [
        "website",
        "github",
        "reddit",
        "explorer",
        "whitepaper",
        "youtube",
        "twitter",
        "facebook",
        'instagram',
        "telegram",
        "medium",
        "discord",
        "sina-weibo",
        "weibo",
        "wechat"
    ];

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={1} className="coin-name">
                    {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
                </Title>

                <p>
                    {cryptoDetails.name} live price in US Dollar (USD). View
                    value statistics, market cap and supply.
                </p>
            </Col>

            <Select
                defaultValue="7d"
                className="select-time-period"
                placeholder="Select TimePeriod"
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((date, i) => (
                    <Option value={date} key={i}>{date}</Option>
                ))}
            </Select>

            <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />

            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            {cryptoDetails.name} Value Statistics
                        </Title>

                        <p>
                            An overview showing the statistics of{" "}
                            {cryptoDetails.name}, such as the base and quote
                            currency, the rank, and trading volume.
                        </p>
                    </Col>

                    {stats.map(({ icon, title, value }, i) => (
                        <Col className="coin-stats" key={i}>
                            <Text className="coin-stats-name">
                                {icon}
                                {title}
                            </Text>

                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>

                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            Other Stats Info
                        </Title>

                        <p>
                            An overview showing the statistics of{" "}
                            {cryptoDetails.name}, such as the base and quote
                            currency, the rank, and trading volume.
                        </p>
                    </Col>

                    {genericStats.map(({ icon, title, value }, i) => (
                        <Col className="coin-stats" key={i}>
                            <Text className="coin-stats-name">
                                {icon}
                                {title}
                            </Text>

                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>

            <Col className="coin-desc-link">
                <Col className="coin-desc">
                    <Title level={3} className="coin-details-heading">
                        What is {cryptoDetails.name}?
                    </Title>

                    <p>
                        {HTMLReactParser(cryptoDetails.description)}
                    </p>
                </Col>

                <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">
                        {cryptoDetails.name} Links
                    </Title>

                    <Row gutter={[25, 0]}>
                        {cryptoDetails.links?.map((link, i) => {
                            const { type, name, url } = link;

                            return (
                                <Col
                                    xs={24}
                                    sm={12}
                                    className="coin-link"
                                    key={i}
                                >
                                    <Title level={5} className="link-name">
                                        {allLinkTypes.includes(type.toLowerCase()) ? (
                                            <>
                                                {type.toLowerCase() === 'website' && <GlobalOutlined />}
                                                {type.toLowerCase() === 'github' && <GithubOutlined />}
                                                {type.toLowerCase() === 'reddit' && <RedditOutlined />}
                                                {type.toLowerCase() === 'explorer' && <FileSearchOutlined />}
                                                {type.toLowerCase() === 'whitepaper' && <FilePdfOutlined />}
                                                {type.toLowerCase() === 'youtube' && <YoutubeOutlined />}
                                                {type.toLowerCase() === 'twitter' && <TwitterOutlined />}
                                                {type.toLowerCase() === 'instagram' && <InstagramOutlined />}
                                                {type.toLowerCase() === 'facebook' && <FacebookOutlined />}
                                                {type.toLowerCase() === 'telegram' && <SendOutlined className="telegram" />}
                                                {type.toLowerCase() === 'medium' && <MediumOutlined />}
                                                {(type.toLowerCase() === ('sina-weibo' || 'weibo')) && <WeiboOutlined />}
                                                {type.toLowerCase() === 'discord' && <CustomerServiceOutlined />}
                                                {type.toLowerCase() === 'wechat' && <WechatOutlined />}
                                            </>
                                        ) : <GlobalOutlined />}

                                        {type}
                                    </Title>

                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {name}
                                    </a>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
            </Col>
        </Col>
    );
};

export default CryptoDetails;
