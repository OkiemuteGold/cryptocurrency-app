import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Select, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetCryptosQuery, useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;
const { Option } = Select;

const Exchanges = () => {
    const { data: cryptos, isFetching } = useGetCryptosQuery(100);
    let limit = 15;

    const [cryptoType, setCryptoType] = useState({
        coinId: cryptos?.data?.coins[0].uuid,
        limit
    });

    const { data: exchanges } = useGetExchangesQuery(cryptoType);

    const exchangesList = exchanges?.data?.exchanges;

    // console.log(exchangesList, cryptos);

    useEffect(() => {
        setCryptoType({
            coinId: cryptos?.data?.coins[0].uuid,
            limit
        });

        // eslint-disable-next-line
    }, [cryptos?.data]);

    if (isFetching || !exchangesList) return <Loader />;

    return (
        <>
            <Row>
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select or search a crypto"
                        optionFilterProp="children"
                        onChange={(value) => setCryptoType({
                            coinId: value,
                            limit
                        })}
                        filterOption={(input, option) =>
                            // console.log(input, option)
                            option.children[1]
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="" disabled>Select or search crypto</Option>

                        {cryptos?.data?.coins?.map((currency, i) => (
                            <Option value={currency.uuid} key={i}>
                                <img
                                    src={currency.iconUrl}
                                    alt={`${currency.name} (${currency.symbol})`}
                                    height={18}
                                    width={18}
                                />
                                {currency.name} - {currency.symbol}
                            </Option>
                        ))}
                    </Select>
                </Col>

                <Col span={24}>
                    <p className="exchange-intro-title">
                        Showing top {cryptoType?.limit} exchanges for {
                            cryptos?.data?.coins?.find(
                                item => cryptoType?.coinId === item.uuid
                            ).name
                        }
                    </p>
                </Col>
            </Row>

            <Row className="exchanges-header">
                <Col span={10}>
                    <Text>Exchange/Rank</Text>
                </Col>
                {/* 24h Trade Volume, marketShare */}
                <Col span={4}>
                    <Text>Market</Text>
                </Col>
                <Col span={6}>
                    <Text>Price</Text>
                </Col>
                <Col span={4}>
                    <Text>BTC Price</Text>
                </Col>
            </Row>

            <Row className="exchanges-body">
                {exchangesList.map((exchange, i) => (
                    <Col span={24} key={i}>
                        <Collapse>
                            <Panel
                                showArrow={false}
                                header={(
                                    <Row className="panel-row">
                                        <Col span={10}>
                                            <Text className="exchange-rank"><strong>{exchange.rank}.</strong></Text>

                                            <Avatar className="exchange-image" src={exchange.iconUrl} />

                                            <Text><strong>{exchange.name}</strong></Text>
                                        </Col>
                                        {/* 24hVolume, marketShare */}
                                        <Col span={4}>{millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={6}>${millify(exchange.price)}</Col>
                                        <Col span={4} className="btc-price-equivalent">${millify(exchange.btcPrice)}</Col>
                                    </Row>
                                )}
                            >
                                {HTMLReactParser(exchange.description || 'No description available')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Exchanges;
