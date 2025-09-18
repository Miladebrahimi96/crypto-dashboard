import { Layout, Menu, Typography } from 'antd';
import { useTranslation } from '@/core/i18n/useTranslation';
import { DollarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AppDrawer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const items = [
    {
      key: '1',
      label: t('coins.title'),
      icon: <DollarOutlined />,
      onClick: () => handleNavigate('/coins'),
    },
  ];

  const getSelectedKeys = () => {
    const pathname = window.location.pathname;
    return pathname.startsWith('/coins') ? ['1'] : [];
  };

  return (
    <Layout.Sider className='h-full w-[350px]! max-w-[350px]! p-5'>
      <Typography.Title
        level={2}
        className='!mb-0 text-center text-white text-lg'
      >
        {t('dashboard.title')}
      </Typography.Title>
      <Menu
        items={items}
        mode="inline"
        theme="dark"
        className="mt-4"
        selectedKeys={getSelectedKeys()}
      />
    </Layout.Sider>
  );
};

export default AppDrawer;