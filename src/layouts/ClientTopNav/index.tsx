// components/TopNav/ClientTopNav.tsx
"use client"
import { Burger, Group } from '@mantine/core'
import React from 'react'

interface ClientTopNavProps {
    sidebarOpened: boolean;
    toggle: () => void;
    children: React.ReactNode;
}

const ClientTopNav = ({
    sidebarOpened,
    toggle,
    children
}: ClientTopNavProps) => {
    return (
        <Group h="100%" px="md" wrap='nowrap'  >
                <Burger 
                    opened={sidebarOpened} 
                    onClick={toggle} 
                    hiddenFrom="sm" 
                    size="sm" 
                />
            {children}
        </Group>
    )
}

export default ClientTopNav