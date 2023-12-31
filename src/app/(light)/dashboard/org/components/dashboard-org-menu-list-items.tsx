'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import GTWMenuItem from '@/components/menu-item/menu-item';
import useOrganization from '@/hooks/use-organization';

import dashboardOrgMenuItems from './dashboard-org-menu-items';

/**
 * List all menu items of the desktop org dashboard
 */
export default function DashboardOrgMenuListItems() {
  const activePath = usePathname();
  const { pathnameOrg } = useOrganization();
  const menuItems = useMemo(
    () => (pathnameOrg ? dashboardOrgMenuItems(pathnameOrg) : undefined),
    [pathnameOrg]
  );

  return (
    menuItems?.map(({ activeHrefs, ...item }) => (
      <GTWMenuItem
        key={item.name}
        active={activeHrefs.some((path) => activePath.includes(path))}
        {...item}
      />
    )) ?? null
  );
}
