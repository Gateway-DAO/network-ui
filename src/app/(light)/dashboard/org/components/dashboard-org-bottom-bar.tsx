'use client';
import React, { useMemo } from 'react';

import useOrganization from '@/hooks/use-organization';

import MenuBottomListItems from '../../components/menu/menu-bottom-list-items';
import dashboardOrgDevelopersMenuItems from './dashboard-org-developer-menu-items';
import dashboardOrgMenuItems from './dashboard-org-menu-items';

export default function DashboardOrgBottomBar() {
  const { pathnameOrg } = useOrganization();
  const menuItems = useMemo(
    () => (pathnameOrg ? dashboardOrgMenuItems(pathnameOrg) : undefined),
    [pathnameOrg]
  );
  const developerItems = useMemo(
    () =>
      pathnameOrg ? dashboardOrgDevelopersMenuItems(pathnameOrg) : undefined,
    [pathnameOrg]
  );
  if (!menuItems || !developerItems) return null;
  return (
    <MenuBottomListItems
      menuItems={menuItems}
      developerItems={developerItems}
    />
  );
}
