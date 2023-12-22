'use client';

import DataSquaredIcon from '@/components/icons/data-squared';
import useGaEvent from '@/hooks/use-ga-event';

import { Box, Button, Stack, Typography, Link } from '@mui/material';

type Props = {
  title: string;
  desc: string;
  btnLink: string;
  btnText: string;
};

export default function IssueNowCard({ title, desc, btnLink, btnText }: Props) {
  const { sendEvent } = useGaEvent();

  return (
    <Stack
      component={Link}
      position={'relative'}
      href={btnLink}
      data-testid="issue-now-card"
      sx={{
        p: 2,
        boxShadow: 'none',
        backgroundColor: 'primary.main',
        width: '100%',
        textDecoration: 'none',
        borderRadius: 1,
      }}
    >
      <DataSquaredIcon sx={{ width: 40, height: 40, mb: 3 }} />
      <Typography variant="h5" color="common.white" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="common.white"
        sx={{ mb: 3, flexGrow: 1 }}
      >
        {desc}
      </Typography>
      <Box>
        <Button
          variant="contained"
          onClick={() => sendEvent('click_issue_now_home')}
          sx={{
            backgroundColor: 'common.white',
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'common.white',
              color: 'primary.dark',
            },
          }}
        >
          {btnText}
        </Button>
      </Box>
    </Stack>
  );
}
