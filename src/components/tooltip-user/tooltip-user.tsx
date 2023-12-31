import { MutableRefObject, useEffect, useRef } from 'react';

import { DATE_FORMAT } from '@/constants/date';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';

import { Verified } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Paper, Stack, Typography } from '@mui/material';

import GTWAvatar from '../gtw-avatar/gtw-avatar';

type Props = {
  onClose: () => void;
  right?: boolean;
  picture?: string;
  name: string;
  userId: string;
  username: string;
  issuance_date: string;
  isOrganization?: boolean;
  verified?: boolean;
};

export function TooltipUser({
  onClose,
  right = false,
  picture,
  name,
  username,
  issuance_date,
  isOrganization,
  userId,
  verified,
}: Props) {
  const wrapperRef = useRef(null);

  const useOutsideAlerter = (ref: MutableRefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          onClose();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(wrapperRef as any);

  return (
    <Paper
      component={Stack}
      ref={wrapperRef}
      elevation={2}
      sx={{
        position: 'absolute',
        top: 70,
        borderRadius: 1,
        backgroundColor: 'common.white',
        border: '1px solid',
        borderColor: 'divider',
        width: 313,
        p: 2,
        right: right ? 0 : 'inherit',
        zIndex: 1,
      }}
    >
      <Stack
        justifyContent="space-between"
        direction="row"
        gap={1}
        sx={{ mb: 2 }}
      >
        <GTWAvatar src={picture} size={64} name={userId} alt={name!} />
        <CloseIcon
          sx={{
            cursor: 'pointer',
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: 'action.hover',
            p: 1,
          }}
          onClick={onClose}
        />
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Typography id="tooltip-name" fontSize={24}>
          {limitCharsCentered(name as string, 20)}
        </Typography>
        {verified && (
          <Verified
            sx={{
              fontSize: 16,
              color: 'primary.main',
            }}
          />
        )}
      </Stack>
      <Typography
        id="tooltip-username"
        variant="body2"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        {limitCharsCentered(username as string, 29)}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack>
          <Typography>
            {isOrganization ? 'Organization ID' : 'User ID'}
          </Typography>
          {issuance_date && (
            <Typography variant="body2" color="text.secondary">
              Joined in{' '}
              {issuance_date ? dayjs(issuance_date).format(DATE_FORMAT) : ''}
            </Typography>
          )}
        </Stack>
        {/* <Link href="https://www.google.com" passHref target="_blank">
          <LaunchIcon
            sx={{
              color: 'text.primary',
              fontSize: 16,
            }}
          />
        </Link> */}
      </Stack>
    </Paper>
  );
}
