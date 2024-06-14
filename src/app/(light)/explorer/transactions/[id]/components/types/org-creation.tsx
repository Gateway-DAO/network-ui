import { DATE_FORMAT } from '@/constants/date';
import { transaction_detail } from '@/locale/en/transaction';
import { ActivityQuery } from '@/services/protocol-v3/types';
import dayjs from 'dayjs';

import { Stack, Divider } from '@mui/material';

import CardRow from '../card-row';
import UserColumn from '../user-column';

export default function OrgCreation({
  data,
}: {
  data: ActivityQuery['activity'];
}) {
  return (
    <Stack
      sx={{
        mb: 3,
        overflow: 'visible',
      }}
      divider={
        <Divider
          sx={{
            width: '100%',
          }}
        />
      }
    >
      <CardRow title={transaction_detail.gateway_id}>
        <UserColumn isLoading={false} user={data.to} />
      </CardRow>
      {/* <CardRow title={transaction_detail.verified}>
        {data.from?.verified ? 'Verified' : 'Not verified'}
      </CardRow> */}
      <CardRow title={transaction_detail.created_at}>
        {dayjs(data?.createdAt).format(DATE_FORMAT)}
      </CardRow>
    </Stack>
  );
}
