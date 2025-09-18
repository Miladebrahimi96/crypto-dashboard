import React from 'react';
import { CoinModel } from '@/core/api';
import { useCoins } from '@/core/services';
import { Avatar, Card, Spin, Typography, Divider, Form, Input } from 'antd';
import { RiseOutlined, FallOutlined, ArrowRightOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons';
import { List } from '@/core/components';
import { Button } from '@/core/components/Button';
import { Link } from 'react-router';
import { useTranslation } from '@/core/i18n/useTranslation';

const { Title, Text } = Typography;

const Coins: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [search, setSearch] = React.useState('');
  const [dataSource, setDataSource] = React.useState<CoinModel[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const { getCoins } = useCoins();
  const [fetchParams, setFetchParams] = React.useState({
    page: 1,
    perPage: 5,
    order: 'market_cap_desc',
    vsCurrency: 'usd',
    parkline: false
  });

  //#region Apis
  const getDataSource = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const resp = await getCoins({
        params: fetchParams,
      });

      if (resp.length < fetchParams.perPage) {
        setHasMore(false);
      }

      setDataSource(prev => [...prev, ...resp]);
      setFetchParams(prev => ({
        ...prev,
        page: prev.page + 1
      }));

    } catch (error) {
      console.error(error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }
  //#endregion

  const onScroll = () => {
    if (!loading && hasMore) {
      getDataSource();
    }
  };

  const onFinish = (values: any) => {
    setDataSource(prev => prev.filter(item => item?.name?.toLowerCase().includes(values.search.toLowerCase())));
  };

  React.useEffect(() => {
    getDataSource();
  }, []);

  const CoinCard = ({ item }: { item: CoinModel }) => (
    <Card
      hoverable
      className="h-full bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      styles={{ body: { padding: '20px' } }}
      actions={
        [
          <Link to={`/coins/${item.id}`}>
            <Button
              type="link"
              icon={<ArrowRightOutlined />}
            >
              {t('common.view_details')}
            </Button>
          </Link>
        ]
      }
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar
            src={item.image}
            size={48}
            className="border-2 border-gray-200 shadow-md"
          />
          <div>
            <Title level={5} className="mb-0 text-gray-800">
              {item.name}
            </Title>
            <Text type="secondary" className="text-sm font-medium uppercase">
              {item.symbol}
            </Text>
          </div>
        </div>

        <Divider className="my-3" />

        {/* Price Information */}
        <div className="flex items-center justify-between">
          <Text strong className="text-lg text-gray-800">
            {item.getFormattedPrice()}
          </Text>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${item.priceChangePercentage24h && item.priceChangePercentage24h > 0
            ? 'bg-green-100 text-green-600'
            : item.priceChangePercentage24h && item.priceChangePercentage24h < 0
              ? 'bg-red-100 text-red-600'
              : 'bg-gray-100 text-gray-600'
            }`}>
            {item.priceChangePercentage24h && item.priceChangePercentage24h > 0 ? (
              <RiseOutlined className="text-xs" />
            ) : item.priceChangePercentage24h && item.priceChangePercentage24h < 0 ? (
              <FallOutlined className="text-xs" />
            ) : item.priceChangePercentage24h && item.priceChangePercentage24h === 0 ? (
              <ClearOutlined className="text-xs" />
            ) : null}
            <Text
              strong
              className={`text-sm ${item.priceChangePercentage24h && item.priceChangePercentage24h > 0 ? 'text-green-600' : item.priceChangePercentage24h && item.priceChangePercentage24h < 0 ? 'text-red-600' : 'text-gray-600'
                }`}
            >
              {item.priceChangePercentage24h && item.priceChangePercentage24h.toFixed(2)}% {item.priceChangePercentage24h && item.priceChangePercentage24h === 0 ? '0.00%' : null}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Title level={2} className="text-gray-800 mb-2">
            {t('coins.title')}
          </Title>
          <Text type="secondary" className="text-lg">
            {t('coins.description')}
          </Text>
        </div>

        <Form
          onFinish={onFinish}
          form={form}
          className="w-full flex items-center justify-center space-x-2"
          layout="inline"
          initialValues={{ search }}
          onValuesChange={(changedValues, allValues) => {
            setSearch(allValues.search);
          }}
        >
          <Form.Item name="search">
            <Input placeholder={t('common.search')} />
          </Form.Item>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => form.submit()}
          >
            {t('common.search')}
          </Button>
        </Form>

        {loading && dataSource.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <Spin size="large" />
              <div className="mt-4">
                <Text type="secondary">{t('common.loading')}</Text>
              </div>
            </div>
          </div>
        ) : (
          <List
            data={dataSource}
            itemKey="symbol"
            onScroll={onScroll}
            hasMore={hasMore}
            loading={loading}
            threshold={300}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
          >
            {(item) => <CoinCard item={item} />}
          </List>
        )}
      </div>
    </div>
  );
};

export default Coins;