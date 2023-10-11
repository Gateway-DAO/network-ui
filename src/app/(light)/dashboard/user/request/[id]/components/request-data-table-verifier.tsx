import { DataModel, DataResourceStatus } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest';

import { Stack } from '@mui/material';

import RequestDataVerifierView from './request-data-verifier';
import { addDataModelDataToSchema } from './utils';

type Props = {
  schema: any[];
  dataModels: PartialDeep<DataModel>[];
  raw?: any;
  status: DataResourceStatus;
};

export default function RequestDataTableVerifierView({
  schema,
  dataModels,
  raw,
  status,
}: Props) {
  const schemaJoin =
    schema && schema.length > 0
      ? addDataModelDataToSchema(schema, dataModels)
      : schema;
  return (
    <Stack direction="column" gap={2} mt={2}>
      {schemaJoin.map((dataModel: any) => (
        <RequestDataVerifierView
          raw={raw}
          key={dataModel.id}
          dataModel={dataModel}
          status={status}
        />
      ))}
    </Stack>
  );
}
