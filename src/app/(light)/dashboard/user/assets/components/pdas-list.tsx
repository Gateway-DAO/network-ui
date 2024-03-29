'use client';

import dynamic from 'next/dynamic';

import routes from '@/constants/routes';
import {
  Issued_PdasQuery,
  PdaStatus,
  Received_PdasQuery,
} from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';

import PDAsListContainer from './pdas-list-container';

const PdaCard = dynamic(
  () => {
    return import('@/components/pda-card/pda-card');
  },
  { ssr: false }
);

type Props = {
  pdas: Received_PdasQuery['myPDAs'] | Issued_PdasQuery['issuedPDAs'];
  issuedPdas?: boolean;
};

export default function PDAsList({ pdas, issuedPdas }: Props) {
  return (
    <>
      {pdas && pdas.length > 0 && (
        <PDAsListContainer>
          {pdas.map((pda) => {
            const user = pda.dataAsset?.organization
              ? {
                  image: pda.dataAsset?.organization?.image,
                  name: pda.dataAsset?.organization?.name,
                  id: pda.dataAsset?.organization?.id,
                }
              : {
                  image: issuedPdas
                    ? pda.dataAsset?.owner?.profilePicture ?? null
                    : pda.dataAsset?.issuer?.profilePicture ?? null,
                  name: issuedPdas
                    ? pda.dataAsset?.owner?.displayName ??
                      pda.dataAsset?.owner?.gatewayId ??
                      limitCharsCentered(pda.dataAsset?.owner?.id as string, 12)
                    : pda.dataAsset?.issuer?.displayName ??
                      pda.dataAsset?.issuer?.gatewayId ??
                      limitCharsCentered(
                        pda.dataAsset?.issuer?.id as string,
                        12
                      ),
                  id: issuedPdas
                    ? pda.dataAsset?.owner?.id
                    : pda.dataAsset?.issuer?.id,
                };
            return (
              <PdaCard
                id={pda.id}
                userId={user.id as string}
                key={pda.id}
                href={routes.dashboard.user.asset(pda.id!)}
                name={pda.dataAsset?.title ?? 'PDA name'}
                userImage={user.image}
                userName={user.name ?? 'Issuer'}
                status={pda.status ?? PdaStatus.Valid}
              />
            );
          })}
        </PDAsListContainer>
      )}
    </>
  );
}
