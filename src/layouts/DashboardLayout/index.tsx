import React from 'react';
import ClientDashboardLayout from './ClientDashboardLayout ';
import { BottomNav, SideNav, TopNav } from '@/components';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ClientDashboardLayout
      header={<TopNav />}
      navbar={<SideNav />}
      footer={<BottomNav />}
    >
      {children}
    </ClientDashboardLayout>
  );
};

export default DashboardLayout;
