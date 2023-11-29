'use client';

import Link from 'next/link';

import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { dataModelCard } from '@/locale/en/datamodel';
import { useToggle } from '@react-hookz/web';

import { Button, Stack } from '@mui/material';

import LearnMore from './learn-more/learn-more';

type Props = {
  id: string;
};

export default function IssuePdaActions({ id }: Props) {
  const [openDetailModal, toggleDetailModal] = useToggle(false);
  const { isOrg, organization } = useOrganization();
  return (
    <>
      <Stack direction="row" gap={1}>
        <Button
          component={Link}
          size="small"
          variant="contained"
          href={
            isOrg
              ? routes.dashboard.org.issuePda(organization.gatewayId, id)
              : routes.dashboard.user.issuePda(id)
          }
        >
          {dataModelCard.issue}
        </Button>
        <Button size="small" variant="outlined" onClick={toggleDetailModal}>
          {dataModelCard.learn_more}
        </Button>
      </Stack>
      <LearnMore open={openDetailModal} onClose={toggleDetailModal} id={id} />
    </>
  );
}
