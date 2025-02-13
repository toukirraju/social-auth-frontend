'use client';
import ToggleModeSwitch from '@/components/toggleModeSwitch';
import { logout, profileInfo } from '@/redux/features/common/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  Avatar,
  Flex,
  Group,
  Menu,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import React from 'react';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(profileInfo);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Menu
      trigger="click"
      openDelay={100}
      closeDelay={400}
      shadow="md"
      width={200}
    >
      <Menu.Target>
        <Group gap="xs" className="cursor-pointer">
          <Avatar size={40} src={profile?.avatar} radius={40} />
          {profile ? (
            <Stack gap={0}>
              <Text fz="sm" fw={500}>
                {profile?.name}
              </Text>
              <Text fz="xs" c="dimmed">
                {profile?.roles && profile?.roles[0]}
              </Text>
            </Stack>
          ) : (
            <Stack gap="sm">
              <Skeleton height={8} width={60} />
              <Skeleton height={8} width={40} />
            </Stack>
          )}
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item>
          <Flex w={'100%'} justify="space-between" align="center">
            <Text fw={500} size="sm">
              Mode
            </Text>
            <ToggleModeSwitch />
          </Flex>
        </Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Messages</Menu.Item>
        <Menu.Item>Gallery</Menu.Item>
        <Menu.Item
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item>Transfer my data</Menu.Item>
        <Menu.Item color="red" component={'button'} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
