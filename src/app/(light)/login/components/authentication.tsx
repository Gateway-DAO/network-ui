'use client';

import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { useLoginStepState } from '@/app/(light)/login/providers/step-provider/step-provider';
import routes from '@/constants/routes';

import AuthenticationLayout from './authentication-layout';
import AddEmail from './sections/add-email';
import { ChooseGatewayId } from './sections/choose-gateway-id';
import { AuthenticationInitial } from './sections/initial/initial';
import { VerifyEmailAddToken } from './sections/verify-email-add-token';
import { VerifyEmailLoginToken } from './sections/verify-email-login-token';

export function Authentication() {
  const { step, setStepState } = useLoginStepState();

  if (step === 'completed') {
    redirect(routes.dashboardUserHome);
  }

  if (step === 'verify-email-login-code') {
    return (
      <AuthenticationLayout
        closeButonProps={{
          onClick: () => setStepState({ step: 'initial' }),
        }}
      >
        <VerifyEmailLoginToken />
      </AuthenticationLayout>
    );
  }

  if (step === 'add-email') {
    return <AddEmail />;
  }

  if (step === 'verify-email-add-code') {
    return (
      <AuthenticationLayout
        closeButonProps={{
          onClick: () => setStepState({ step: 'initial' }),
        }}
      >
        <VerifyEmailAddToken />
      </AuthenticationLayout>
    );
  }

  if (step === 'choose-gatewayid') {
    return (
      <AuthenticationLayout
        closeButonProps={{
          onClick: async () => {
            await signOut({ redirect: false });
            setStepState({ step: 'initial' });
          },
        }}
      >
        <ChooseGatewayId />
      </AuthenticationLayout>
    );
  }

  return (
    <AuthenticationLayout
      closeButonProps={{
        href: routes.home,
      }}
    >
      <AuthenticationInitial />
    </AuthenticationLayout>
  );
}
