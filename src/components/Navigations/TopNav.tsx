import { Group, Text } from '@mantine/core'
import React from 'react'
import RightMenus from './components/RightMenus'

const TopNav = () => {
  return (
    <Group h="100%" w="100%" justify='space-between'>
      {/* left side */}
      <Group align="center" maw={300}>
        <Text size="xl" fw={700}>
          Logo
        </Text>
      </Group>
      {/* right side */}
      <Group align="center">
        <RightMenus />
      </Group>
    </Group>
  )
}

export default TopNav
