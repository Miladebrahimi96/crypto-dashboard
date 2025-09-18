import React, { useState } from 'react';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Header } from '../Header';
import { Drawer as AppDrawer } from '../Drawer';
import { Outlet } from 'react-router';

const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Layout hasSider className="min-h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block sticky h-screen overflow-y-auto top-0 bottom-0">
        <AppDrawer />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={'auto'}
        className="md:hidden p-0 w-[350px]"
      >
        <AppDrawer />
      </Drawer>

      <Layout>
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <Layout.Content className="p-4 md:p-6">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;