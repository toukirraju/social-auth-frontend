'use client';
import { Icon } from '@/components/Icons';
import { NavLink } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
const data = [
  {
    icon: 'ri:dashboard-fill',
    label: 'Dashboard',
    description: 'Item with description',
    href: '/dashboard',
  },
  {
    icon: 'carbon:category',
    label: 'Categories',
    href: '/categories',
  },
  {
    icon: 'fluent-mdl2:product-variant',
    label: 'Products',
    href: '/products',
  },
  { icon: 'lets-icons:order-duotone-line', label: 'Orders', href: '/orders' },
  { icon: 'bx:bx-user', label: 'Customers', href: '/customers' },
  { icon: 'mdi:partnership-outline', label: 'Partners', href: '/partners' },
  { icon: 'material-symbols:files-outline', label: 'File Manager', href: '/files' },
  { icon: 'bx:bx-support', label: 'Support', href: '/support' },
];

const SideNav = () => {
  const pathname = usePathname();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const activeIndex = data.findIndex((item) => item.href === pathname);
    if (activeIndex !== -1) {
      setActive(activeIndex);
    }
  }, [pathname]);

  const items = data.map(
    (
      item: {
        icon: string;
        label: string;
        href: string;
        description?: string;
        rightSection?: number | string;
      },
      index
    ) => (
      <NavLink
        component={Link}
        href={item.href}
        key={item.label}
        active={index === active}
        label={item.label}
        description={item.description}
        rightSection={item?.rightSection}
        leftSection={<Icon icon={item.icon} />}
        onClick={() => setActive(index)}
      />
    )
  );
  return <>{items}</>;
};

export default SideNav;
