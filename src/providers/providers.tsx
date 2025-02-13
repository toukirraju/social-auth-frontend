'use client';
import { StoreProvider } from '@/redux/StoreProvider';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <ModalsProvider>
        <Notifications position="top-center" />
        <StoreProvider>{children}</StoreProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};

export default Providers;
