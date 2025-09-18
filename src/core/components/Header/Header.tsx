import React from 'react';
import { Button, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useTranslation } from '@/core/i18n/useTranslation';

interface HeaderProps {
  onMenuClick?: () => void;
}

const AppHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { t } = useTranslation();
  return (
    <Layout.Header className="md:hidden bg-white shadow-sm border-b px-4 md:px-6">
      <div className="flex items-center justify-between h-full ">
        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={onMenuClick}
          className="md:hidden"
        />

        {/* Logo/Title */}
        <h1 className="md:hidden text-lg md:text-xl font-bold text-gray-800 m-0">
          {t('dashboard.title') as string}
        </h1>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
        </div>
      </div>
    </Layout.Header>
  );
};

export default AppHeader;