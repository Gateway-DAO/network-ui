'use client';
import { LoadingButton } from '@/components/buttons/loading-button/loading-button';
import { TitleSubtitleField } from '@/components/title-field/title-field';
import { auth } from '@/locale/en/auth';
import { errorMessages } from '@/locale/en/errors';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { Stack, TextField, Typography } from '@mui/material';

import { EmailSchema } from '../../schema';

export function ChooseEmail() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<EmailSchema>();

  const onSubmitEmail = async (data: EmailSchema) => {
    try {
      console.log('test', data);
    } catch (e) {
      (e as any)?.response?.errors?.forEach(({ message }: any) => {
        if (message === 'EMAIL_ALREADY_REGISTERED') {
          setError('email_address', {
            type: 'manual',
            message: errorMessages[message as keyof typeof errorMessages],
          });
        } else {
          enqueueSnackbar(
            errorMessages[message as keyof typeof errorMessages] ||
              errorMessages.UNEXPECTED_ERROR,
            {
              variant: 'error',
            }
          );
        }
      });
    }
  };

  return (
    <Stack
      component="form"
      gap={2}
      direction={'column'}
      onSubmit={handleSubmit(onSubmitEmail)}
    >
      <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
        {auth.steps.choose_email.title}
      </Typography>
      <TitleSubtitleField
        title={auth.steps.choose_email.subtitle}
        subtitle={auth.steps.choose_email.description}
      />
      <TextField
        required
        label={auth.steps.choose_email.label}
        type="email"
        id="email_address"
        {...register('email_address')}
        error={!!errors.email_address}
        helperText={
          (errors.email_address?.message ??
            auth.steps.choose_email.helper_text) as string
        }
      />

      <LoadingButton
        type="submit"
        variant="contained"
        sx={{ mt: 2, height: 48 }}
        isLoading={false}
      >
        {auth.steps.initial.continue}
      </LoadingButton>
    </Stack>
  );
}
