'use client';
import {
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Icon } from '../Icons';

const ToggleModeSwitch = () => {
  // Add mounting state
  const [mounted, setMounted] = useState(false);

  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  const computedColorScheme = useComputedColorScheme('light');

  // Set mounted to true after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMode = (isDark: boolean) => {
    setColorScheme(isDark ? 'dark' : 'light');
  };

  // Prevent rendering until mounted
  if (!mounted) {
    return (
      <div className="h-5 w-12 bg-slate-400/70 dark:bg-slate-700/70 backdrop-blur-2xl rounded-full animate-pulse" />
    );
  }

  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={
        <Icon
          icon="tabler:sun"
          fontSize={14}
          color="var(--mantine-color-yellow-4)"
        />
      }
      offLabel={
        <Icon
          icon="tabler:moon-stars"
          fontSize={14}
          color="var(--mantine-color-blue-6)"
        />
      }
      checked={computedColorScheme === 'dark'}
      onChange={(e) => toggleMode(e.target.checked)}
    />
  );
};

export default ToggleModeSwitch;
