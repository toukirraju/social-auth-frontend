// components/ClientDashboardLayout.tsx
'use client';
import { AppShell } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React from 'react';
import ClientTopNav from '../ClientTopNav';
import { useInitialDataFetch } from '@/hooks/useInitialUserFetch';

interface ClientDashboardLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  navbar: React.ReactNode;
  footer?: React.ReactNode;
}

const ClientDashboardLayout = ({
  children,
  header,
  navbar,
  footer,
}: ClientDashboardLayoutProps) => {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery('(max-width: 768px)'); // Adjust breakpoint as needed

  useInitialDataFetch();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      {...(footer && isMobile && { footer: { height: 40 } })}
      padding="md"
    >
      <AppShell.Header>
        <ClientTopNav sidebarOpened={opened} toggle={toggle}>
          {header}
        </ClientTopNav>
      </AppShell.Header>
      <AppShell.Navbar p="md">{navbar}</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      {footer && isMobile && <AppShell.Footer>{footer}</AppShell.Footer>}
    </AppShell>
  );
};

export default ClientDashboardLayout;
