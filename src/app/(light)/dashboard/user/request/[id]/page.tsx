import { Metadata } from 'next';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';

import BackButton from '@/components/buttons/back-button/back-button';
import TopBarContainer from '@/components/containers/top-bar-container/top-bar-container';
import CopyTextButton from '@/components/copy-text-button/copy-text-button';
import PermissionError from '@/components/permission-error/permission-error';
import RequestStatusChip from '@/components/requests/request-status-chip';
import { TitleId } from '@/components/title-id/title-id';
import ToggleCollapse from '@/components/toggle-collapse/toggle-collapse';
import { DATE_FORMAT } from '@/constants/date';
import routes from '@/constants/routes';
import { common } from '@/locale/en/common';
import { request } from '@/locale/en/request';
import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { getPrivateApi } from '@/services/protocol/api';
import {
  DataRequestQuery,
  DataResourceStatus,
  ProofQuery,
} from '@/services/protocol/types';
import { NEGATIVE_CONTAINER_PX } from '@/theme/config/style-tokens';
import { PageProps } from '@/types/next';
import { getSessionOrg } from '@/utils/currentOrg';
import { isSandbox } from '@/utils/env';
import { limitCharsCentered } from '@/utils/string';
import dayjs from 'dayjs';
import { PartialDeep } from 'type-fest';

import { Box, Divider, Paper, Stack, Typography } from '@mui/material';

import RequestCard from './components/request-card';
import RequestCardVerfierView from './components/request-card-verifier';
import RequestDataTable from './components/request-data-table';
import RequestDataTableVerifierView from './components/request-data-table-verifier';

export const getDataRequest = async (
  id: string
): Promise<PartialDeep<DataRequestQuery['dataRequest']> | null> => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const dataRequest = (await privateApi.dataRequest({ id }))?.dataRequest;
  return dataRequest;
};

const getRequestValidData = async (requestId: string) => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const requestValidData = (
    await privateApi.dataRequestValidData({ requestId })
  )?.findValidPDAsForRequest;
  return requestValidData;
};

const getProofData = async (
  proofId: string
): Promise<PartialDeep<ProofQuery['proof']> | null> => {
  const privateApi = await getPrivateApi();
  if (!privateApi) {
    return null;
  }

  const proof = (await privateApi.proof({ id: proofId })).proof;
  return proof;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const dataRequest = await getDataRequest(params.id);

  return {
    title: `Data Request ${dataRequest?.id} - Gateway Network`,
    description: dataRequest?.dataUse,
  };
}

export default async function DashboardUserDataRequest({
  params: { id, username },
}: PageProps<{ id: string; username?: string }>) {
  if (!isSandbox) {
    redirect(routes.dashboard.user.home);
  }
  const session = (await getGtwServerSession()) as Session;
  const userId = session.user.id;
  const dataRequest = await getDataRequest(id);
  const pathnameOrg = username;
  const organization = await getSessionOrg(pathnameOrg || '');

  if (!dataRequest || !dataRequest.id) {
    return <h1>Error</h1>;
  }

  if (
    userId !== dataRequest?.owner?.id &&
    userId !== dataRequest?.verifier?.id &&
    organization?.id !== dataRequest?.verifierOrganization?.id
  ) {
    return <PermissionError />;
  }

  const isOwner = userId === dataRequest?.owner?.id;
  const requestHasOrgAsVerifier = !!dataRequest?.verifierOrganization?.id;
  const requestValidData = isOwner ? await getRequestValidData(id) : null;
  const proofData =
    isOwner ||
    dataRequest.status !== DataResourceStatus.Accepted ||
    !dataRequest.proof?.id
      ? {}
      : await getProofData(dataRequest.proof?.id);

  const requester = requestHasOrgAsVerifier
    ? dataRequest.verifierOrganization?.name ??
      dataRequest.verifierOrganization?.gatewayId ??
      limitCharsCentered(dataRequest.verifierOrganization?.id as string, 15)
    : dataRequest.verifier?.displayName ??
      dataRequest.verifier?.gatewayId ??
      limitCharsCentered(dataRequest.verifier?.id as string, 15) ??
      '';
  const recipient =
    dataRequest.owner?.displayName ??
    dataRequest.owner?.gatewayId ??
    limitCharsCentered(dataRequest.owner?.id as string, 15) ??
    '';

  return (
    <>
      <TopBarContainer>
        <BackButton
          href={
            !!organization?.id
              ? routes.dashboard.org.requests(organization?.gatewayId)
              : routes.dashboard.user.requests
          }
        />
      </TopBarContainer>
      <TitleId title={request.title} id={id} />
      <Stack direction="column" gap={2}>
        {!!isOwner ? (
          <RequestCard
            requester={requester}
            requesterId={
              requestHasOrgAsVerifier
                ? (dataRequest.verifierOrganization?.id as string)
                : (dataRequest.verifier?.id as string)
            }
            status={dataRequest.status!}
            requestId={dataRequest.id}
            proofId={dataRequest.proof?.id}
            requestValidData={requestValidData}
            profilePicture={
              requestHasOrgAsVerifier
                ? dataRequest.verifierOrganization?.image
                : dataRequest.verifier?.profilePicture
            }
          />
        ) : (
          <RequestCardVerfierView
            recipientId={dataRequest.owner?.id as string}
            recipient={recipient}
            status={dataRequest.status!}
            proofId={dataRequest.proof?.id}
            profilePicture={dataRequest.owner?.profilePicture}
          />
        )}
        <Paper
          component={Stack}
          divider={<Divider orientation="vertical" sx={{ height: 'unset' }} />}
          direction="row"
          elevation={0}
        >
          <Stack gap={1} flex="1" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {common.general.created_at}
            </Typography>
            <Typography>
              {dataRequest.createdAt
                ? dayjs(dataRequest.createdAt).format(DATE_FORMAT)
                : ''}
            </Typography>
          </Stack>
          <Stack gap={1} flex="1" alignItems="flex-start" sx={{ p: 2 }}>
            <Typography variant="caption" color="text.secondary">
              {common.general.status}
            </Typography>
            <RequestStatusChip
              status={dataRequest.status!}
              variant="filled"
              size="small"
            />
          </Stack>
        </Paper>
        <ToggleCollapse
          hiddenLabel={common.actions.more_info}
          visibleLabel={common.actions.less_info}
        >
          <Paper
            component={Stack}
            divider={
              <Divider orientation="vertical" sx={{ height: 'unset' }} />
            }
            direction="row"
            elevation={0}
          >
            <Stack gap={1} flex="1" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {request.label.request_id}
              </Typography>
              <Box>
                <CopyTextButton text={id} limit={8} />
              </Box>
            </Stack>
            <Stack gap={1} flex="1" alignItems="flex-start" sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {request.label.request_template_id}
              </Typography>
              <Box>
                <CopyTextButton
                  text={dataRequest.dataRequestTemplate?.id as string}
                  limit={8}
                />
              </Box>
            </Stack>
          </Paper>
        </ToggleCollapse>
        <Divider sx={{ mx: NEGATIVE_CONTAINER_PX, mt: 2, mb: 4 }} />
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          {request.label.requested_data}
        </Typography>
        <Typography variant="body1" mb={1}>
          {dataRequest.dataUse}
        </Typography>
        {isOwner ? (
          <RequestDataTable
            schema={dataRequest.dataRequestTemplate?.schema}
            validData={requestValidData}
            dataModels={dataRequest.dataRequestTemplate?.dataModels || []}
          />
        ) : (
          <RequestDataTableVerifierView
            schema={dataRequest.dataRequestTemplate?.schema}
            dataModels={dataRequest.dataRequestTemplate?.dataModels || []}
            status={dataRequest.status!}
            raw={proofData?.data?.raw}
          />
        )}
      </Stack>
    </>
  );
}
