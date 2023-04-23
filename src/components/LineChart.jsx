
import React from 'react';

import { Col, Row, Typography } from 'antd';

import { Line } from 'react-chartjs-2';

// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables)

import {
    Chart, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.history[i].timestamp).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart </Title>

                <Col className="price-container">
                    <Title level={5} className="price-change">Change: <span>{coinHistory?.change}%</span></Title>
                    <Title level={5} className="current-price">Current {coinName} Price: <span>${currentPrice}</span></Title>
                </Col>
            </Row>

            <Line
                data={data}
            />
        </>
    );
};

export default LineChart;
