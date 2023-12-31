'use client';

import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import GTWAvatar from '@/components/gtw-avatar/gtw-avatar';
import { queries } from '@/constants/queries';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { proofs } from '@/locale/en/proof';
import { Proof, Received_ProofsQuery } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<PartialDeep<Proof>>[] = [
  {
    field: 'owner',
    headerName: proofs.owner,
    flex: 1,
    valueGetter: (params) => params.row.owner?.gatewayId,
    renderCell(params) {
      return (
        <Stack direction="row" alignItems="center" gap={2}>
          <GTWAvatar
            name={params.row.owner!.id ?? ''}
            src={params.row.owner?.profilePicture}
            size={32}
          />
          <Typography fontWeight={700}>
            {params.row.owner?.displayName ??
              params.row.owner?.gatewayId ??
              params.row.owner?.id}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'requestId',
    headerName: proofs.request_id,
    flex: 1,
    valueGetter: (params) => params.row.dataRequest?.id,
    renderCell(params) {
      return limitCharsCentered(params.row.dataRequest?.id as string, 12);
    },
  },
  {
    field: 'dataRequestTemplateId',
    headerName: proofs.request_template_id,
    flex: 1,
    valueGetter: (params) => params.row.dataRequest?.dataRequestTemplate?.id,
    renderCell(params) {
      return limitCharsCentered(
        params.row.dataRequest?.dataRequestTemplate?.id as string,
        12
      );
    },
  },
  {
    field: 'createdAt',
    headerName: proofs.share_date,
    flex: 1,
    valueFormatter: (params) =>
      params.value ? dayjs(params.value).format('MM/DD/YYYY, h:mm A') : '',
  },
  {
    field: 'dataAmount',
    headerName: proofs.data_amount,
    type: 'number',
    flex: 1,
    valueGetter: (params) => params.row.data?.PDAs?.length,
  },
];

type Props = {
  data: PartialDeep<Proof>[];
  count: number;
};

export default function OrganizationProofsReceivedTable({
  data: initialData,
  count = 0,
}: Props) {
  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { organization } = useOrganization();

  const { privateApi } = useGtwSession();
  const { data, isLoading } = useQuery({
    enabled: !!organization?.id,
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      queries.proofs_received_by_org,
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
      organization?.id,
    ],
    queryFn: () =>
      privateApi?.received_proofs_by_org({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
        organizationId: organization?.id as string,
      }),
    select: (data: any) => (data as Received_ProofsQuery)?.receivedProofs,
    initialData: initialData && initialData.length ? initialData : null,
  });

  const setNewPage = ({ page }: { page: number }) => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page ? page : 0,
    }));
  };

  return (
    <DataGrid
      {...defaultGridConfiguration}
      rows={data && data.length ? data : initialData}
      rowCount={count}
      columns={columns}
      paginationModel={paginationModel}
      loading={isLoading}
      onPaginationModelChange={setNewPage}
      sx={defaultGridCustomization}
      onRowClick={(value) => {
        router.push(
          routes.dashboard.org.proof(organization?.gatewayId, value?.id)
        );
      }}
    />
  );
}
