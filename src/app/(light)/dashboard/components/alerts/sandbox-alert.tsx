'use client';

import { useEffect, useState } from 'react';

import { sandboxAlert } from '@/locale/en/alert-messages';
import { common } from '@/locale/en/common';

import { Button, Typography, AlertTitle, Alert } from '@mui/material';

export default function SandboxAlert() {
  const [showAlert, toggleAlert] = useState(false);
  const storageKey = 'testnet-disclaimer';

  const hasSeenTestnetDisclaimer: string | null =
    localStorage.getItem(storageKey) || null;

  useEffect(() => {
    if (!hasSeenTestnetDisclaimer || hasSeenTestnetDisclaimer !== 'closed') {
      toggleAlert(true);
    }
  }, []);

  return (
    showAlert && (
      <Alert
        sx={{
          borderRadius: '16px',
          mb: 4,
          mt: 4,
          alignItems: 'center',
        }}
        severity="warning"
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              localStorage.setItem(storageKey, 'closed');
              toggleAlert(false);
            }}
          >
            {common.actions.close}
          </Button>
        }
      >
        <AlertTitle>{sandboxAlert.title}</AlertTitle>
        <Typography variant="body2">{sandboxAlert.description}</Typography>
      </Alert>
    )
  );
}
