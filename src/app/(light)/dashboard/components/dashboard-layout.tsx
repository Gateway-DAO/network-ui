import { PropsWithChildren, ReactNode } from 'react';

import { Stack } from '@mui/material';

import DashboardPage from './dashboard-page';
import Logo from './logo/logo';
import Sidebar from './sidebar/sidebar';

type Props = {
  menuItems: ReactNode;
  mobileMenuItems: ReactNode;
};

export default function DashboardLayout({
  children,
  menuItems,
  mobileMenuItems,
}: PropsWithChildren<Props>) {
  return (
    <Stack
      direction={{
        xs: 'column',
        lg: 'row',
      }}
      alignItems="stretch"
      sx={{ minHeight: '100%' }}
    >
      <Sidebar menuItems={menuItems}>
        <Logo />
      </Sidebar>
      <DashboardPage
        sx={{
          marginLeft: {
            xs: 0,
            lg: '300px',
          },
        }}
      >
        {children}
      </DashboardPage>
      {mobileMenuItems}
    </Stack>
  );
}
