'use client';
import { common } from '@/locale/en/common';
import { errorMessages } from '@/locale/en/errors';
import { useSnackbar } from 'notistack';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, ButtonProps } from '@mui/material';

type Props = {
  text: string;
  customButtonText?: string;
  sucessMessage?: string;
};

export default function CopyButton({
  text,
  customButtonText,
  sucessMessage = 'Copied to clipboard', // TODO: Add locale,
  ...props
}: Props & ButtonProps) {
  const { enqueueSnackbar } = useSnackbar();

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(sucessMessage);
    } catch (err) {
      enqueueSnackbar(errorMessages.UNEXPECTED_ERROR, { variant: 'error' });
    }
  };

  return (
    <Button
      onClick={() => copy(text)}
      startIcon={<ContentCopyIcon />}
      variant="outlined"
      {...props}
    >
      {customButtonText ?? common.actions.copy}
    </Button>
  );
}
