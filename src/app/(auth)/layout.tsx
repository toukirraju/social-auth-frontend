import { Container, Stack } from '@mantine/core';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack>
      <Container
        size="xl"
        className="w-full h-dvh flex justify-center items-center"
      >
        {children}
      </Container>
    </Stack>
  );
}
