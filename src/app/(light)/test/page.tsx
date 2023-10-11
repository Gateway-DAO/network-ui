import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';

export default async function TestPage() {
  const session = await getGtwServerSession();

  return <>Watf {JSON.stringify(session)}</>;
}
