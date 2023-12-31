'use client';

import { useMemo, useState } from 'react';

import useMyWallet from '@/hooks/use-my-wallet';
import {
  DataModelByIdQuery,
  UserIdentificationInput,
  UserIdentifierType,
} from '@/services/protocol/types';
import { numberToMoneyString } from '@/utils/money';
import { FormProvider, useForm } from 'react-hook-form';

import { Stack } from '@mui/material';

import Preview from './preview/preview';
import { IssuePdaSchema } from './schema';
import OwnerSection from './sections/owner/owner';
import PropertiesSection from './sections/properties/properties';
import Summary from './sections/summary';
import TitleDescriptionSection from './sections/title-description';
import { getSchemaDefaultValues, issuePdaValidator } from './validators';

type Props = {
  dataModel: DataModelByIdQuery['dataModel'];
};

export default function Form({ dataModel }: Props) {
  const { myWallet } = useMyWallet();

  const [previewModalState, setPreviewModalState] = useState<{
    isOpen: boolean;
    data?: IssuePdaSchema;
  }>({ isOpen: false });

  const schemaDefaultValues = useMemo(
    () => getSchemaDefaultValues(dataModel.schema),
    [dataModel.schema]
  );

  const methods = useForm<IssuePdaSchema>({
    values: {
      owner: {
        type: UserIdentifierType.GatewayId,
        value: '',
      },
      title: dataModel.title,
      description: dataModel.description,
      claim: schemaDefaultValues,
    },
    resolver: async (value, context, options) =>
      issuePdaValidator(value, dataModel.schema, context, options),
    mode: 'onSubmit',
  });

  const owner = methods.watch('owner');
  const { error: ownerError } = methods.getFieldState('owner.value');

  const setOwner = (values: UserIdentificationInput) => {
    methods.setValue('owner', values);
    methods.trigger('owner');
  };
  const resetOwner = () => {
    methods.setValue('owner', {
      type: UserIdentifierType.GatewayId,
      value: '',
    });
  };

  const amount = 1;
  const price = 0.01;
  const total = numberToMoneyString(amount * price);
  const canIssue = !!(myWallet && myWallet.balance - price >= 0);

  const onSubmit = async (data: IssuePdaSchema) => {
    if (!canIssue) {
      return;
    }
    setPreviewModalState({ isOpen: true, data });
  };

  const onClosePreview = () => {
    setPreviewModalState((oldState) => ({ ...oldState, isOpen: false }));
  };

  const onError =
    process.env.NODE_ENV === 'development' ? console.error : undefined;

  return (
    <>
      <Stack gap={2} mb={14} onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <OwnerSection
          owner={owner}
          ownerError={ownerError?.message}
          setOwner={setOwner}
          resetOwner={resetOwner}
        />
        <FormProvider {...methods}>
          <Stack component="form" gap={2}>
            <TitleDescriptionSection />
            <PropertiesSection schema={dataModel.schema} />
            <Summary amount={amount} total={total} canIssue={canIssue} />
          </Stack>
        </FormProvider>
      </Stack>
      {!!previewModalState.data && (
        <Preview
          amount={amount}
          price={price}
          total={total}
          onClose={onClosePreview}
          schema={dataModel.schema}
          isOpen={previewModalState.isOpen}
          data={previewModalState.data}
        />
      )}
    </>
  );
}
