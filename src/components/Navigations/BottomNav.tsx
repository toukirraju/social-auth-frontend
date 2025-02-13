import { Flex, SegmentedControl } from '@mantine/core'
import React from 'react'

const BottomNav = () => {
  return (
    <Flex w={"100%"}><SegmentedControl w={"100%"} color="blue" data={['React', 'Angular', 'Vue', 'Svelte']} /></Flex>
  )
}

export default BottomNav
