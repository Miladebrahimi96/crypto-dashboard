import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, Row, Col, Statistic, Typography, Image, Spin, Alert, Space, Tabs, Button } from 'antd';
import { ArrowLeftOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { SingleCoinModel } from '@/core/api/models/singleCoin';
import { MarketChartModel } from '@/core/api/models/marketChart';
import { useTranslation } from '@/core/i18n/useTranslation';
import { useCoins } from '@/core/services/useCoins';
import { PriceChart } from '@/components';

const { Title, Text } = Typography;

const Coin: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getMarketChart, getSingleCoin } = useCoins();
  const [coin, setCoin] = useState<SingleCoinModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<MarketChartModel | null>(null);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartError, setChartError] = useState<string | null>(null);

  //#region Apis
  const fetchChartData = async (coinId: string | undefined) => {
    if (!coinId) {
      setChartError('Coin ID is required');
      setChartLoading(false);
      return;
    }

    try {
      setChartLoading(true);
      setChartError(null);

      const chartResponse = await getMarketChart({
        path: { id: coinId },
        params: {
          vsCurrency: 'usd',
          days: 7,
        }
      });

      setChartData(chartResponse);
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setChartError('Failed to load chart data');
    } finally {
      setChartLoading(false);
    }
  };

  const fetchCoinDetail = async () => {
    if (!id) {
      setError('Coin ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const coinResponse = await getSingleCoin({
        path: { id },
      });

      setCoin(coinResponse);
    } catch (err) {
      console.error('Error fetching coin detail:', err);
      setError('Failed to load coin detail');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinDetail();
    fetchChartData(id);
  }, [id]);
  //#endregion

  const formatNumber = (num: number | undefined): string => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatCurrency = (num: number | undefined): string => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    }).format(num);
  };

  const formatPercentage = (num: number | undefined): string => {
    if (!num) return 'N/A';
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="p-6">
        <Alert
          message="Error"
          description={error || 'Coin not found'}
          type="error"
          showIcon
          action={
            <Button
              size="small"
              onClick={() => navigate('/coins')}
              disabled={loading}
            >
              {t('coin.back_to_coins')}
            </Button>
          }
        />
      </div>
    );
  }

  const OverviewTab = () => (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title={t('coin.current_price')}
              value={coin?.getFormattedPrice()}
              precision={2}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title={t('coin.24h_change')}
              value={coin?.getPriceChangePercentage24h()}
              formatter={(value) => formatPercentage(Number(value))}
              valueStyle={{
                color: (coin?.getPriceChangePercentage24h() || 0) >= 0 ? '#3f8600' : '#cf1322'
              }}
              prefix={(coin?.getPriceChangePercentage24h() || 0) >= 0 ? <RiseOutlined /> : <FallOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title={t('coin.market_cap')}
              value={coin?.getFormattedMarketCap()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title={t('coin.24h_volume')}
              value={coin?.getFormattedVolume()}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Supply Information" className="h-full">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Text strong>{t('coin.circulating_supply')}:</Text>
                <Text>{coin?.getFormattedSupply()} {coin?.symbol?.toUpperCase()}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>{t('coin.total_supply')}:</Text>
                <Text>{formatNumber(coin?.marketData?.totalSupply)} {coin?.symbol?.toUpperCase()}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>{t('coin.max_supply')}:</Text>
                <Text>{coin?.getFormattedMaxSupply()} {coin?.symbol?.toUpperCase()}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>{t('coin.market_cap_rank')}:</Text>
                <Text>#{coin?.getMarketCapRank()}</Text>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Price Statistics" className="h-full">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Text strong>{t('coin.24h_high')}:</Text>
                <Text>{formatCurrency(coin?.marketData?.high24h?.usd)}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>{t('coin.24h_low')}:</Text>
                <Text>{formatCurrency(coin?.marketData?.low24h?.usd)}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>{t('coin.all_time_high')}:</Text>
                <Text>{formatCurrency(coin?.getAthPrice())}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>{t('coin.all_time_low')}:</Text>
                <Text>{formatCurrency(coin?.getAtlPrice())}</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const ChartTab = () => (
    <PriceChart
      data={chartData}
      loading={chartLoading}
      error={chartError}
      coinName={coin?.name || ''}
    />
  );

  const tabItems = [
    {
      key: 'overview',
      label: t('coin.overview'),
      children: <OverviewTab />,
    },
    {
      key: 'chart',
      label: t('coin.price_chart'),
      children: <ChartTab />,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Space className="mb-4">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/coins')}
            type="text"
          >
            {t('coin.back_to_coins')}
          </Button>
        </Space>

        <div className="flex items-center gap-4 mb-4">
          <Image
            src={coin?.getImageUrl('large')}
            alt={coin?.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <Title level={1} className="!mb-0">
              {coin?.name}
            </Title>
            <Text type="secondary" className="text-lg">
              {coin?.symbol?.toUpperCase()}
            </Text>
          </div>
        </div>
      </div>

      <Tabs
        defaultActiveKey="overview"
        items={tabItems}
      />
    </div>
  );
};

export default Coin;