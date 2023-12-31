'use client';

import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';

import {
  defaultGridConfiguration,
  defaultGridCustomization,
} from '@/components/data-grid/grid-default';
import AvatarTextCell from '@/components/table-cells/avatar-text-cell';
import { TextStatusChip } from '@/components/text-status-chip/text-status-chip';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { pdas } from '@/locale/en/pda';
import {
  Issued_Pdas_By_OrgQuery,
  OrganizationIdentifierType,
  PdaStatus,
} from '@/services/protocol/types';
import { PrivateDataAsset } from '@/services/protocol/types';
import { limitCharsCentered } from '@/utils/string';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Typography } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';

type Props = {
  data: PartialDeep<PrivateDataAsset>[];
  totalCount: number;
};

export default function PDAsTable({ data: initialData, totalCount }: Props) {
  const columns: GridColDef[] = [
    {
      field: 'dataAsset',
      headerName: pdas.data_asset,
      flex: 1.3,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography variant="body1" fontWeight={700}>
            {params.row.dataAsset.title}
          </Typography>
        );
      },
    },
    {
      field: 'owner',
      headerName: pdas.recipient,
      flex: 1.3,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <AvatarTextCell
            userId={params.row.dataAsset?.owner?.id}
            name={
              params.row.dataAsset?.owner?.displayName ??
              params.row.dataAsset?.owner?.gatewayId ??
              params.row.dataAsset?.owner?.id
            }
            picture={params.row.dataAsset?.owner?.profilePicture ?? null}
          />
        );
      },
    },
    {
      field: 'dataModelId',
      headerName: pdas.data_model_id,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography variant="body1">
            {limitCharsCentered(params.row.dataAsset?.dataModel?.id, 6)}
          </Typography>
        );
      },
    },
    {
      field: 'issuanceDate',
      headerName: pdas.issuance_date,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography>
            {params.row.issuanceDate
              ? dayjs(params.row.issuanceDate).format(DATE_FORMAT)
              : ''}
          </Typography>
        );
      },
    },
    {
      field: 'status',
      headerName: pdas.status,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <TextStatusChip
            status={params.row.status ?? PdaStatus.Valid}
            size="small"
            variant="outlined"
          />
        );
      },
    },
  ];

  const router = useRouter();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const { organization } = useOrganization();

  const { privateApi } = useGtwSession();
  const { data, isLoading } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      'issued-data-assets-by-org',
      organization?.id,
      paginationModel ? paginationModel.page : 0,
      paginationModel ? paginationModel.pageSize : 5,
    ],
    queryFn: () =>
      privateApi?.issued_pdas_by_org({
        skip: paginationModel.page * paginationModel.pageSize,
        take: paginationModel.pageSize,
        organization: {
          type: OrganizationIdentifierType.OrgId,
          value: organization?.id as string,
        },
      }),
    select: (data: any) => (data as Issued_Pdas_By_OrgQuery)?.issuedPDAs,
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
      columns={columns}
      rowCount={totalCount}
      paginationModel={paginationModel}
      onPaginationModelChange={setNewPage}
      paginationMode="server"
      loading={isLoading}
      sx={defaultGridCustomization}
      onRowClick={(params: GridRowParams) => {
        router.push(
          routes.dashboard.org.asset(organization?.gatewayId, params.id)
        );
      }}
    />
  );
}
