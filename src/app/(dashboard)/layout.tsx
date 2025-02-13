import { DashboardLayout } from '@/layouts';
import { Container, Stack } from '@mantine/core';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
