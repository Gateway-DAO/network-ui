import { Metadata } from 'next';

import DataOutlinedIcon from '@/components/icons/data-outlined';
import routes from '@/constants/routes';
import { pdas as pdasLocales } from '@/locale/en/pda';
import { getPrivateApi } from '@/services/protocol/api';

import { Box, Button, Typography } from '@mui/material';

import PdasHeader from '../components/pdas-header';
import HelpCards from './components/help-cards';
import ReceivedPDAsList from './components/list';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Received Data Assets - Gateway Network',
  };
}

export default async function DataAssetsPage() {
  const privateApi = await getPrivateApi();

  const pdas = (await privateApi.received_pdas({ take: 6, skip: 0 }))?.myPDAs;

  return (
    <>
      <PdasHeader>
        <Button
          variant="contained"
          size="large"
          endIcon={<DataOutlinedIcon />}
          href={routes.dashboard.user.issue}
        >
          {pdasLocales.issue_a_pda}
        </Button>
      </PdasHeader>
      <Box sx={{ pt: 5 }}>
        <HelpCards />
        {pdas && pdas.length > 0 && <ReceivedPDAsList pdas={pdas} />}
        {pdas && pdas.length === 0 && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', width: '100%' }}
          >
            {pdasLocales.empty}
          </Typography>
        )}
      </Box>
    </>
  );
}
