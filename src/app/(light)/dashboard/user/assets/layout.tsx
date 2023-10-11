import { PropsWithChildren } from 'react';

import GTWTab from '@/components/tabs/gtw-tab';
import GTWTabs from '@/components/tabs/gtw-tabs-links';
import TitleLayout from '@/components/title-layout/title-layout';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { pdas } from '@/locale/en/pda';
import {
  CONTAINER_PX,
  NEGATIVE_CONTAINER_PX,
} from '@/theme/config/style-tokens';

import { Box } from '@mui/material';

import HelpContent from './components/help-content';
import HelpMenu from './components/help-menu';

export default function DataAssetsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ py: 2 }}>
      <TitleLayout
        title={pdas.my_data_assets}
        subtitle={pdas.data_assets_subtitle}
        titleId="title-assets"
      />
      <HelpContent />
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mx: NEGATIVE_CONTAINER_PX,
          px: CONTAINER_PX,
        }}
      >
        <GTWTabs>
          <GTWTab
            label={common.general.received}
            href={routes.dashboardUserReceivedAssets}
          />
          <GTWTab
            label={common.general.issued}
            href={routes.dashboardUserIssuedAssets}
          />
        </GTWTabs>
      </Box>
      <Box sx={{ pt: 5 }}>{children}</Box>
      <HelpMenu />
    </Box>
  );
}
