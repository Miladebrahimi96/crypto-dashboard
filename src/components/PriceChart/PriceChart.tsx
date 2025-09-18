import React from 'react';
import { Line } from '@ant-design/charts';
import { Card, Spin, Alert, Statistic, Row, Col } from 'antd';
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { MarketChartModel } from '@/core/api/models/marketChart';
import { useTranslation } from '@/core/i18n/useTranslation';

interface PriceChartProps {
  data: MarketChartModel | null;
  loading: boolean;
  error: string | null;
  coinName: string;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, loading, error, coinName }) => {
  const { t } = useTranslation();

  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(num);
  };

  const formatPercentage = (num: number): string => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <Card>
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Alert
          message={t('coin.chart_loading_error')}
          description={error}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  if (!data || !data.prices || data.prices.length === 0) {
    return (
      <Card>
        <Alert
          message={t('coin.chart_no_data')}
          description={t('coin.chart_no_data_description')}
          type="warning"
          showIcon
        />
      </Card>
    );
  }

  const chartData = data.getChartData();
  const priceChange = data.getPriceChangePercentage();
  const priceRange = data.getPriceRange();
  const currentPrice = chartData[chartData.length - 1]?.price || 0;

  const config = {
    data: chartData,
    xField: 'timestamp',
    yField: 'price',
    smooth: true,
    point: {
      size: 3,
      shape: 'circle',
    },
    line: {
      size: 2,
    },
    color: priceChange >= 0 ? '#52c41a' : '#ff4d4f',
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: 'Price',
          value: formatCurrency(datum.price),
        };
      },
      customContent: (title: string, items: any[]) => {
        if (!items || items.length === 0) return '';
        const item = items[0];
        const dataPoint = chartData.find(d => d.timestamp === item.data?.timestamp);
        return `
          <div style="padding: 8px;">
            <div style="margin-bottom: 4px; font-weight: 500;">${coinName} Price</div>
            <div style="margin-bottom: 4px;">Date: ${dataPoint?.date}</div>
            <div style="margin-bottom: 4px;">Time: ${dataPoint?.time}</div>
            <div style="color: ${priceChange >= 0 ? '#52c41a' : '#ff4d4f'}; font-weight: 500;">
              Price: ${formatCurrency(item.value)}
            </div>
          </div>
        `;
      },
    },
    xAxis: {
      type: 'time',
      tickCount: 7,
      label: {
        formatter: (text: string) => {
          const date = new Date(parseInt(text));
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        },
      },
    },
    yAxis: {
      label: {
        formatter: (text: string) => formatCurrency(parseFloat(text)),
      },
    },
    height: 400,
    padding: 'auto',
  };

  return (
    <div className="space-y-4">
      {/* Chart Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Statistic
              title="Current Price"
              value={currentPrice}
              formatter={(value) => formatCurrency(Number(value))}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Statistic
              title={t('coin.chart_7day_change')}
              value={priceChange}
              formatter={(value) => formatPercentage(Number(value))}
              valueStyle={{
                color: priceChange >= 0 ? '#3f8600' : '#cf1322'
              }}
              prefix={priceChange >= 0 ? <RiseOutlined /> : <FallOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card size="small">
            <Statistic
              title={t('coin.chart_7day_range')}
              value={`${formatCurrency(priceRange.min)} - ${formatCurrency(priceRange.max)}`}
            />
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Card title={t('coin.chart_price_history')}>
        <Line {...config} />
      </Card>
    </div>
  );
};

export default PriceChart;
