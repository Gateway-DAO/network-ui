import { proofs as proofsLocales } from '@/locale/en/proof';
import { getPrivateApi } from '@/services/protocol/api';
import { Proof } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Typography } from '@mui/material';

import ProofsSentTable from './components/proofs-sent-table';

export default async function DashboardUserSentProofs() {
  const privateApi = await getPrivateApi();

  const proofs = (await privateApi.sent_proofs({ take: 6, skip: 0 }))
    ?.sentProofs as PartialDeep<Proof>[];

  return (
    <>
      {proofs && proofs.length > 0 && <ProofsSentTable data={proofs} />}
      {proofs && proofs.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', width: '100%' }}
        >
          {proofsLocales.empty}
        </Typography>
      )}
    </>
  );
}