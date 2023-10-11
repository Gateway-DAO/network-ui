import { getSession } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';

import routes from '@/constants/routes';

import getLoginStep from './get-step';
import { useLoginStepState } from './step-provider';

export default function useLoginStepHandler() {
  const { setStepState } = useLoginStepState();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onHandleStep = async () => {
    const session = await getSession();
    const step = getLoginStep(session);
    switch (step) {
      case 'completed':
        const callbackUrl = searchParams.get('callbackUrl');
        router.push(callbackUrl ?? routes.dashboardUserHome);
        break;

      default:
        setStepState({ step });
        break;
    }
    return step;
  };

  return onHandleStep;
}
